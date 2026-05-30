const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'API for managing books and a reading list'
    },
    host: 'cse-340-project-1-plek.onrender.com',
    schemes: ['https'],  
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generate the swagger.json file at the specified output path
swaggerAutogen(outputFile, endpointsFiles, doc);