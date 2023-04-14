## Проект: movies-explorer-api
#### Бэкенд дипломного проекта в Яндекс Практикум по специальности "Веб-разработчик".

* * *

#### Функционал: API для аутентификации пользователей и сохранения фильмов.

В проекте задействовано два API - [мой API](https://github.com/UserGitHub37/movies-explorer-api) с регистрацией, авторизацией пользователей и с их избранными (сохраненными) фильмами и [сторонний API](https://api.nomoreparties.co/beatfilm-movies) с базой фильмов.

* * *

#### Movies Explorer - интерактивный сайт с регистрацией и авторизацией, с поиском и сортировкой фильмов как в основной базе так и в сохраненных фильмах пользователя.

Ссылка на сайт https://movies.tw1.ru

Ссылка на фронтенд проекта: https://github.com/UserGitHub37/movies-explorer-frontend

* * *

#### API развернут в Timeweb Cloud на Ubuntu 20.04 и доступен по адресу:
https://api-movies.tw1.ru

* * *

#### Технологии:
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
