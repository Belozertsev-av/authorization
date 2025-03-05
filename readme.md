# Авторизация

Это Fullstack приложение, разработанное для реализации авторизации пользователей. Проект состоит из двух частей: backend и frontend. 
Backend реализован на TypeScript с использованием NestJS, Sequelize и PostgreSQL. Frontend разработан на Vue.js с TypeScript.

## Функциональность

### CRUD операции для пользователей:

- Create: Создание нового пользователя.
- Read: Получение списка всех пользователей или конкретного пользователя.
- Update: Обновление данных пользователя.
- Delete: Удаление пользователя.

### Авторизация:

Реализована с использованием JWT (JSON Web Tokens).

Используются два типа токенов:

- Access Token: Короткоживущий токен для доступа к защищенным ресурсам.
- Refresh Token: Долгоживущий токен для обновления Access Token.

После успешной авторизации, токены сохраняются в браузере.

### Заполнение базы данных:
Используются seeds для заполнения таблицы пользователей тестовыми данными через Sequelize.

## Стек технологий

### Backend

- TypeScript
- NestJS
- Sequelize
- PostgreSQL

### Frontend

- TypeScript
- Vue.js
- Vue-router
- Pinia
- i18n
- Storybook

## Установка и запуск

####  1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Belozertsev-av/authorization
   ```

#### 2. Перейдите в директорию проекта:

```bash
cd authorization
```

#### 3. Запустите сервер разработки:

```bash
docker compose up --build
```

#### 4. Дождитесь сборки проекта. Откройте браузер и перейдите по адресу http://localhost:80.


### Запуск Storybook

#### 1. Перейдите в директорию с фронтендом:

```bash
cd auth-frontend
```

####  2. Установите зависимости:
```sh
yarn install
```

####  3. Запустите storybook:
```sh
yarn storybook
```

### Также есть возможность импортировать коллекцию для [Bruno](https://www.usebruno.com/)

1. Откройте Bruno, в верхнем меню выберите Collection -> Open collection и выбероите каталог `auth-api-client`

2. Готово. Вме переменные окружения и запросы должны импортироваться автоматически
