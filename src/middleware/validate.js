const { BadRequestError } = require("../core/error.response");

const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            params: req.params,
            body: req.body,
        })

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            throw new BadRequestError({ errors: error.errors });
        }

        next(error);
    }
};

module.exports = validate;