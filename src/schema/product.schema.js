const { z } = require("zod");

const createProductSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        isPublished: z.boolean().optional(),
    }),
});

const params = z.object({
    id: z.string(),
});

const updateProductSchema = z.object({
    params,
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
    }),
});

export default {
    createProductSchema,
    updateProductSchema,
};
