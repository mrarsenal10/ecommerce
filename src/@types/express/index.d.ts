/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express } from "express-serve-static-core"
import { IncomingHttpHeaders } from "http"

type objKey = {
    permissions: string[]
}

type keyStore = {
    _id: string,
    user: string,
    privateKey: string,
    publicKey: string,
}

declare module "express-serve-static-core" {
    interface Request {
        objKey: objKey,
        keyStore: keyStore
    }
}

// declare namespace Express {
//     interface Request {
//         objKey: objKey
//     }
// }

declare module "http" {
    interface IncomingHttpHeaders {
        "x-client-id"?: string
        "authorization"?: string
    }
}
