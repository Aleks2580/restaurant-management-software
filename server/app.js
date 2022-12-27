require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');

const login = require('./src/routes/login');
const logout = require('./src/routes/logout');
const users = require('./src/routes/users');
const addUser = require('./src/routes/addUser');
const usersFilter = require('./src/routes/usersFilter');
const deleteUser = require('./src/routes/deleteUser');
const editUser = require('./src/routes/editUser');
const tables = require('./src/routes/tables');
const createOrder = require('./src/routes/createOrder');
const checkUser = require('./src/routes/checkUser');
const addReservation = require('./src/routes/addReservation');

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

app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);
app.use('/add_user', addUser);
app.use('/users_filter', usersFilter);
app.use('/delete_user', deleteUser);
app.use('/edit_user', editUser);
app.use('/tables', tables);
app.use('/create_order', createOrder);
app.use('/check_user', checkUser);
app.use('/add_reservation', addReservation);

app.listen(PORT ?? 5000, () => {
  console.log(`Server started ${PORT}`);
})