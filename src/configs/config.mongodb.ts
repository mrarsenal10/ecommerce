"use strict"

type DbConfig = {
    host: string | undefined;
    port: string | undefined;
    name: string | undefined;
    username?: string;
    password?: string;
};

type AppConfig = {
    port: string | undefined;
};

type ConfigItem = {
    app: AppConfig;
    db: DbConfig;
};

type Config = {
    [key: string]: ConfigItem;
};

const dev: ConfigItem = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
    },
}

const pro: ConfigItem = {
    app: {
        port: process.env.PRO_APP_PORT,
    },
    db: {
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME,
    },
}

const config: Config = { dev, pro }

const env: string = process.env.NODE_ENV || "dev"

export default config[env]
