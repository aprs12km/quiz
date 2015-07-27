// require => IMPORTs
// IMPORT De paquetes con MW
var express = require('express');
var router = express.Router();

// IMPORT De controladores
var quizController = require('../controllers/quiz_controller');	// import "quiz_controller.js"

/* Página de entrada */
router.get('/', function(req, res) {
  res.render('index', { 	// Renderiza (render)	=> views/index.ejs
		title: 'Quiz', errors: [] });	// pasando un PARAM (title)
});

router.get('/author', function(req, res){
	res.render('author',{title: 'Quiz', errors:[]});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);


//EXPORTar "router" para comando de arranque
module.exports = router;
