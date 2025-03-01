import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "COPEREX API",
            version: "1.0.0",
            description: "API para el sistema COPEREX",
            contact: {
                name: "Ludwin Omar Xocoy Miranda",
                email: "omar.xocoy2007@gmail.com" 
            }
        },
        servers: [
            {
                url: "http://localhost:3001/lab#3-coperex/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/company/company.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };