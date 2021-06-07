const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const swaggerJSDoc =require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");







const app = express();

var corsOptions = {
  origin: "http://localhost:3333"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());





// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));





const r= require('./router/info')



app.use(r.routes);

var swaggerDefinition = {
  info: {
      title: 'Training 0',
      version: '2',
      description: '',

  },
  host: `localhost:3333`,
  basePath: '/',
  schemes: [
      'http',
      'https'
  ],
  securityDefinitions: {
      Bearer: {
          type: 'apiKey',
          in: 'header',
          name: 'auth-token'
      }
  }

};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./router/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);






app.use('/training', swaggerUi.serve, swaggerUi.setup(swaggerSpec));








const db = require("./model");
const dbConfig = require("./config/db.config");



db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}:${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
 

// set port, listen for requests
app.listen(3333, () => console.log('App is listening on url http://localhost:3333'));

module.exports = app;