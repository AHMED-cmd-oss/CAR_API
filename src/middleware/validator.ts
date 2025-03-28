import path from 'path'
import * as OpenApiValidator from 'express-openapi-validator'

export const apivalidator = OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, '../schemas/openapi.json'),
    validateRequests: true,
    validateResponses: false, // Disable response validation
    validateApiSpec: true
});