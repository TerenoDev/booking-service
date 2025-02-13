# Простейший генератор микросервисов на expressjs + typeorm

Скрипт-генератор на node.js + преднастроенный `docker-compose.yml` с БД postgres для быстрого подключения микросервисов.

Пример генерации:

```bash
$ node generateMicrosrvice.js

Введите имя микросервиса: auth
Структура для микросервиса "auth" успешно создана!
```

Генерируемая структура:

```bash
auth/
└── src
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    └── services
```
