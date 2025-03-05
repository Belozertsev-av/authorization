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

#### 4. Запустите сервер разработки из корня проекта:

```bash
docker compose up --build
```

### 3. В отдельном терминале. Перейдите в проект backend и выполните скрипт для запуска сидов

```bash
cd auth-backend
npx sequelize-cli seeds:all
```

Будут созданы несколько пользователей. Можно использовать их для тестирования приложения
```javascript
{
        login: 'admin',
        tabel: 12345,
        password: 'password123',
      },
      {
        login: 'user',
        tabel: 67890,
        password: 'password123',
      },
      {
        login: 'tester',
        tabel: 13579,
        password: 'password123',
      },
      {
        login: 'prostoVanya',
        tabel: 24680,
        password: 'password123',
      }
```

#### 4.Откройте браузер и перейдите по адресу http://localhost:80.


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

#### 1. Откройте Bruno, в верхнем меню выберите Collection -> Open collection и выбероите каталог `auth-api-client`

####  2. Готово. Вме переменные окружения и запросы должны импортироваться автоматически