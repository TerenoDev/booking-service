// Конфигурация микросервиса
import { env } from "process";

class Settings {
    DB_HOST = env.DB_HOST || 'localhost'
    DB_PORT = Number(env.DB_PORT) || 15432
    DB_NAME = env.DB_NAME || 'equipmentdb'
    DB_USER = env.DB_USER || 'maindb'
    DB_PASSWORD = env.DB_PASSWORD || 'maindb'
    DB_ENTITIES = env.DB_ENTITIES || 'dist/models/*.js'

    JWT_SECRET_KEY = env.JWT_SECRET_KEY || 'secret'
    JWT_TOKEN_TYPE = env.JWT_SECRET_KEY || 'Bearer'
}

const settings = new Settings();

export default settings