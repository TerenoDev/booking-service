// Конфигурация микросервиса

class Settings {
    JWT_SECRET_KEY = 'secret'
    JWT_TOKEN_TYPE = 'Bearer'
}

const settings = new Settings();

export default settings
