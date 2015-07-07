// EXPORTA 2 MWs (question y answer)
// Serán llamados así => router.get('/quizes/question', quizController.question);
// GET /quizes/question  
exports.question = function(req, res) {  
   res.render('quizes/question', {		// Renderiza (render)	=> quizes/question.ejs
	   pregunta: 'Capital de Italia'}); // pasando un PARAM (pregunta)   
};  
 
// GET /quizes/answer  
exports.answer = function(req, res) {  
   if (req.query.respuesta === 'Roma'){  
      res.render('quizes/answer', {respuesta: 'Correcto'});  
   } else {  
      res.render('quizes/answer', {respuesta: 'Incorrecto'});  
   }  
};  
