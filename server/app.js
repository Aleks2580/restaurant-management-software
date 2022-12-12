require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const { PORT, SESSION_SECRET } = process.env;


const sessionConfig = {
  name: 'SessionRestaurant',
  store: new FileStore(),
  secret: SESSION_SECRET ?? 'vasdg34erh35h24g31f23g3gh3hth',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.listen(PORT ?? 5000, () => {
  console.log(`Server started ${PORT}`);
})