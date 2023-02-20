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
//const createOrder = require('./src/routes/createOrder');
const checkUser = require('./src/routes/checkUser');
const addReservation = require('./src/routes/addReservation');
const reservations = require('./src/routes/reservations');
const deleteReservation = require('./src/routes/deleteReservation');
const editReservation = require('./src/routes/editReservation');
const todaysReservations = require('./src/routes/todaysReservations');
const reservationsFilter = require('./src/routes/reservationsFilter');
const currentOrders = require('./src/routes/currentOrders');
const menuSections = require('./src/routes/menuSections');
const menuCategories = require('./src/routes/menuCategories');
const items = require('./src/routes/items');
const newOrder = require('./src/routes/newOrder');
const viewOrder = require('./src/routes/viewOrder');
const edirOrder = require('./src/routes/editOrder');
const printBill = require('./src/routes/printBill');
const cancelPrintBill = require('./src/routes/cancelPrintBill');
const pay = require('./src/routes/pay');
const dashboard = require('./src/routes/dashboard');




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
//app.use('/create_order', createOrder);
app.use('/check_user', checkUser);
app.use('/add_reservation', addReservation);
app.use('/reservations', reservations);
app.use('/delete_reservation', deleteReservation);
app.use('/edit_reservation', editReservation);
app.use('/todays_reservations', todaysReservations);
app.use('/reservations_filter', reservationsFilter);
app.use('/current_orders', currentOrders);
app.use('/menu_sections', menuSections);
app.use('/menu_categories', menuCategories);
app.use('/items', items);
app.use('/new_order', newOrder);
app.use('/view_order', viewOrder);
app.use('/edit_order', edirOrder);
app.use('/print_bill', printBill);
app.use('/cancel_print_bill', cancelPrintBill);
app.use('/pay', pay);
app.use('/dashboard', dashboard);


app.listen(PORT ?? 5000, () => {
  console.log(`Server started ${PORT}`);
})