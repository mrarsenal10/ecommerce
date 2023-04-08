"use strict";

import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "ApiKeys";

const apikeyShema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        permissions: {
            type: [String],
            required: true,
            enum: ["0000", "0001", "0002"],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, apikeyShema);
