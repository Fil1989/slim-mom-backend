<h1>REST API SlimMom</h1>
Якщо ви - мама, яка хоче схуднути після народження дитини, то в цьому допоможе додаток
<a href="https://github.com/kilinich-v/slim-mom-frontend">SlimMom</a>.
<h2>Опис</h2>
<ul>
<li>Користувачу необхідно зареєструватись у додатку й на сторінці "Калькулятор" поставити ціль, до якої ваги він хоче схуднути. Крім цього необхідно ввести інформацію про свій зріст, теперішню вагу, вік та групу крові. Додаток підраховує добову норму споживання кілокалорій та виводить список категорій нерекомендованої їжі.</li>
<li>На сторінці "Щоденник" користувач може додавати продукти до споживання. Додаток підраховує калорії в цей день і виводить інформацію, яку частину кілокалорій спожито від добової норми, скільки кілокалорій ще можна спожити в цей день. </li>
<li>За допомогою календаря на сторінці "Щоденник" можна проглядати, у який день скільки калорій було спожито, де норма була дотримана, а де перевищена</li>
</ul>
<h2>Залежності проекту</h2>
У розробці REST API були використані пакети:
<ol>
<li>Сервер: Express</li>
<li>Валідація запитів: Joi</li>
<li>База даних: Mongo DB</li>
<li>Інтерфейс БД: Mongoose</li>
<li>Створення токенів: JWT</li>
<li>Шифр паролів: Bcrypt</li>
<li>Документація API: Swagger</li>
</ol>
У базі данних використовуються 3 колекції:
- користувачі (users)
- продукти (products)
- продукти по даті (productsperdates)
<h2>Основні Ендпоінти</h2>

@ POST /users/signup - реєстрація користувача

@ POST /users/login - логінізація користувача

@ POST /users/logout - вилогування

@ POST /users/public - публічний роут для сторінки "Калькулятор"

@ POST /users/private - приватний роут для сторінки "Калькулятор"

@ GET /users/current - перевірка логінізації користувача при перезавантаженні сторінки додатку в браузері

@ GET /products/search - ендпоінт для пошуку всіх назв продуктів за фільтром

@ POST /products - додає продукт

@ DELETE /products/:productId - видаляє продукт за id

@ GET /products/:date - виводить усі спожиті продукти за певну дату

<a href="https://slim-mom-backend.herokuapp.com/api-docs">Детальна документація ендпоінтів</a>

<h2>Запуск сервера</h2>
Використовуються скрипти з package.json: 
Для розробки: "start:dev": "cross-env NODE_ENV=development nodemon ./bin/server.js",
Для продакшну: "start": "cross-env NODE_ENV=production node ./bin/server.js"
