// require => IMPORTs
// IMPORT De paquetes con MW
var express = require('express');
var router = express.Router();

// IMPORT De controladores
var quizController = require('../controllers/quiz_controller');	// import "quiz_controller.js"

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 	// Renderiza (render)	=> views/index.ejs
		title: 'Quiz' });	// pasando un PARAM (title)
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

//EXPORTar "router" para comando de arranque
module.exports = router;