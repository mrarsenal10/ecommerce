"use strict"

import { model, Schema } from "mongoose"

const DOCUMENT_NAME = "Key"
const COLLECTION_NAME = "Keys"

interface IKeyToken {
    user: Schema.Types.ObjectId;
    publicKey: Schema.Types.String
    privateKey: Schema.Types.String
    refreshTokensUsed: Schema.Types.Array
    refreshToken: Schema.Types.String
}
  

const keyTokenSchema = new Schema<IKeyToken>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        publicKey: {
            type: Schema.Types.String,
            required: true,
        },
        privateKey: {
            type: Schema.Types.String,
            required: true,
        },
        refreshTokensUsed: {
            type: Schema.Types.Array,
            default: [],
        },
        refreshToken: {
            type: Schema.Types.String,
            require: true
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
)

export default model<IKeyToken>(DOCUMENT_NAME, keyTokenSchema)
