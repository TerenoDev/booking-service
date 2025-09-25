import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { Express } from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export function useSwagger(
    app: Express,
    options: any,
): Express {
    try {
        const schemas = validationMetadatasToSchemas({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/definitions/',
        });

        const storage = getMetadataArgsStorage();

        const spec = routingControllersToSpec(storage, options, {
            components: {
                schemas,
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            info: {
                title: 'Booking Service API',
                description: 'API documentation for Booking Service',
                version: '1.0.0',
            },
        });

        app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

        return app;
    } catch (error) {
        console.error('Swagger setup error:', error);
        return app;
    }
}