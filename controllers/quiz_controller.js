//IMPORT de "models" para poder acceder a BBDD
var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// EXPORTA 2 MWs (question y answer)
// Serán llamados así => router.get('/quizes/question', quizController.question);
// GET /quizes/question  

exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
//    res.render('quizes/index.ejs', { quizes: quizes});
	res.render('quizes/index', { quizes: quizes});
  }).catch(function(error) { next(error);})
};
 
// GET /quizes/:id
exports.show = function(req, res) {
//  models.Quiz.find(req.params.quizId).then(function(quiz) {res.render('quizes/show', { quiz: quiz});  })
	res.render('quizes/show', { quiz: req.quiz});
}; 

// GET /quizes/:id/answer  
exports.answer = function(req, res) {  
/*
   if (req.query.respuesta === 'Roma'){  
      res.render('quizes/answer', {respuesta: 'Correcto'});  
   } else {  
      res.render('quizes/answer', {respuesta: 'Incorrecto'});  
   }  
 */

//	models.Quiz.findAll().success(function(quiz) {
/*
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto' });
		} else {
			res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto'});
		}
	}) 
*/
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};  
