var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definici�n de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
/*
PARA QUE ME FUNCIONASE (COMMIT 9) HE TENIDO QUE SUSTITUIR
LOS M�TODOS "success" POR "then" (daba error de compilaci�n: "undefined" object)
*/
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si est� vac�a
      Quiz.create({ pregunta: 'Capital de Italia',
      	            respuesta: 'Roma'
      	         })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});