# Проект: movies-explorer-api

## Бэкенд дипломного проекта в Яндекс Практикум.
В дипломном проекте разрабатывается сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

## API развернут в Yandex Cloud на Ubuntu 20.04 и доступен по адресу:
api.movies.thirtyseven.nomoredomains.sbs

## Функционал:
API для аутентификации пользователей и сохранения фильмов.

## Технологии:
JavaScript, Node.js, Express, CORS, MongoDB, mongoose, celebrate, helmet, express-rate-limit, escape-html, dotenv, bcryptjs, jsonwebtoken, winston, express-winston.

* * *

#### Установка и запуск приложения на локальной машине:
(для работы приложения потребуется локально установленная база данных [MongoDB](https://www.mongodb.com/try/download/community) на дефолтном порту 27017)

1. Клонирование репозитория
```bash
git clone https://github.com/UserGitHub37/movies-explorer-api.git
```

2. Запуск сервера
`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload (запуск в режиме разработки, чтобы сервер перезапускался при изменении файлов проекта)

Бэкенд запустится и будет доступен по адресу http://localhost:3000
