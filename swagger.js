const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'API for managing books and a reading list'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],  
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generate the swagger.json file at the specified output path
swaggerAutogen(outputFile, endpointsFiles, doc);