require('dotenv').config();

const { app } =  require('./app');
const swaggerUi = require('swagger-ui-express');
const { apiDocumentation } = require('./docs/apidocs');

const PORT = process.env.PORT || 8080;


app.use('/', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT} 🚀`)
});