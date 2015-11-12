var express = require('express');
var router = express.Router();

var Groups = require(__dirname + '/controllers/groups.js');
var Projects = require(__dirname + '/controllers/projects.js');
var Runs = require(__dirname + '/controllers/runs.js');
var Samples = require(__dirname + '/controllers/samples.js');
var Reads = require(__dirname + '/controllers/reads.js');
var Errors = require(__dirname + '/controllers/errors.js');
var Auth = require(__dirname + '/controllers/auth.js');
var AdditionalFiles = require(__dirname + '/controllers/additionalFiles.js');
//get index
router.route('/').get(Auth.index);

router.route('/signin')
  .get(Auth.signIn)
  .post(Auth.signInPost);

router.route('/signout')
  .get(Auth.signOut);


//download additional File
router.route('/additional/:id/download')
  .all(isAuthenticated)
  .get(AdditionalFiles.download);

router.route('/groups')
  .all(isAuthenticated)
  .get(Groups.index);

//show by lab name
router.route('/:group')
  .all(isAuthenticated)
  .get(Groups.show);

//get new project
router.route('/:group/new')
  .all(isAuthenticated)
  .get(Projects.new);

//post new project
router.route('/:group/new')
  .all(isAuthenticated)
  .post(Projects.newPost);

//get project
router.route('/:group/:project')
  .all(isAuthenticated)
  .get(Projects.show);

//get new sample
router.route('/:group/:project/new')
  .all(isAuthenticated)
  .get(Samples.new);

//post new sample
router.route('/:group/:project/new')
  .all(isAuthenticated)
  .post(Samples.newPost);

//get sample
router.route('/:group/:project/:sample')
  .all(isAuthenticated)
  .get(Samples.show);

//get new run
router.route('/:group/:project/:sample/new')
  .all(isAuthenticated)
  .get(Runs.new);

//post new run
router.route('/:group/:project/:sample/new')
  .all(isAuthenticated)
  .post(Runs.newPost);

//show run
router.route('/:group/:project/:sample/:run')
  .all(isAuthenticated)
  .get(Runs.show);

//new read
router.post('/:group/:project/:sample/:run/add')
  .all(isAuthenticated)
  .post(Runs.addPost);

//show read
router.route('/:group/:project/:sample/:run/:read')
  .all(isAuthenticated)
  .get(Reads.show);

//show run qc
router.route('/:group/:project/:sample/:run/:read/fastqc')
  .all(isAuthenticated)
  .get(Reads.fastQC);

//download run file
router.route('/:group/:project/:sample/:run/:read/download')
  .all(isAuthenticated)
  .get(Reads.download);

//404 page
router.get(['/404', '/:404'], Errors.show);


function isAuthenticated(req, res, next) {
  //next(); //TODO!!

  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.returnTo = req.path;
    return res.redirect('/signin');
  }
}

module.exports = router;
