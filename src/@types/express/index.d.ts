type objKey = {
    permissions: string[]
}

declare namespace Express {
    interface Request {
        objKey: objKey
    }
}