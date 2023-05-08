# Restaurant Management System

## Introduction
RMS (Restaurant Management System) is a comprehensive and fully responsive software solution designed to streamline restaurant operations. It offers a wide range of features that facilitate efficient management of various aspects such as order processing, menu customization, reservations, and reporting. With RMS, restaurant owners and staff can optimize their workflow and enhance the overall dining experience for customers.

This software provides an intuitive interface and powerful tools to simplify day-to-day tasks, allowing restaurants to run smoothly and efficiently. The responsive design ensures that the RMS can be accessed and used seamlessly across different devices, including desktop computers, tablets, and mobile phones. Whether in the restaurant or on the go, users can efficiently manage their restaurant operations using RMS and deliver a seamless dining experience to their customers.

## Tech Stack

### Front-end Stack
- React
- Ant Design
- CSS
- HTML
- JavaScript
- Chart.js
- jsPDF
- XLSX
### Back-end Stack
- Node.js
- Express
- PostgreSQL
- Sequelize

## Features
### Manager Section:

#### *Dashboard*: 
Provides an overview of key metrics for the day, including:
- Total Orders: Displays the number of orders, along with the total amount, table count, total guests, and average check per guest.
- Total Paid Orders: Shows the number of orders that have been paid, along with the same information as above.
- Total Active Orders: Displays the number of currently active orders.
- Reservations: Provides details about reservations, including table numbers, number of guests, and projected revenue.

#### *Users Management*: 
Enables the manager to create new users with specific roles, passwords, and permissions. It also provides a list of all users where the manager can edit or delete user information. Once a user is created, such as a waiter, they can log in with their password and access the software.

#### *Statistics*:
- Revenue: Allows the manager to select a range of dates and generate comprehensive sales statistics, including total revenue, number of guests, and average check per guest. This data can be downloaded as an Excel file.
- Waiters: Enables the manager to select a specific waiter and view their sales information within a date range or for the entire period. This information can be downloaded as a PDF.
- Products: Provides dynamic charts that represent the following information:
   - Quantity and revenue of products sold, categorized by product.
   - Quantity and revenue of products sold, categorized by menu sections.
   - Quantity and revenue of products sold, categorized by menu categories.

#### *Products Management*:
- View All Products: Allows the manager to see a list of all the products available on the menu.
- Edit and Delete Products: Provides the ability to edit product information such as name and price, or delete products that are no longer offered.
- Add New Products: Enables the manager to add new products to the menu, including specifying the name, price and other relevant details.
- Categories and Sections: Allows the manager to manage menu categories and sections, such as adding new categories or sections and assigning products to specific categories or sections.
- 
#### *Reservations Management*:

- Create New Reservations: Provides a feature to create new reservations, including number of guests, date, and time.
- Edit and Delete Reservations: Allows the manager to make changes or cancel existing reservations as needed.
- List of Reservations: Provides a list of all reservations, displaying important details such as number of guests, date, and time.

### Waiter Section:

#### *Layout*: 
Provides a visual representation of the restaurant's layout, indicating which tables are available and which ones are currently occupied. Waiters can easily identify the status of each table at a glance.
 - Create New Order: By clicking on a table, waiters can create a new order for that table. They can view the list of available products, adjust the quantity of items, and save the order. This feature allows waiters to efficiently take orders from customers and customize them according to their preferences.
- Edit Orders: Waiters can also edit existing orders, making modifications to the order items and quantities.
- Print and Cancel Bill: Waiters can print the bill for a specific order, allowing customers to review the charges. Additionally, bill cancellation requires the manager's password for added security and control.

#### *Current Orders*: 
Displays a list of active (taken) tables. By clicking on a table, waiters can access and view the details of the active orders associated with that table. This feature enables waiters to monitor and manage ongoing orders, making necessary adjustments or updates based on customer requests.

#### *Today's Bookings*: 
Provides a list of upcoming reservations for the day. Waiters can refer to this list to anticipate the arrival of reserved guests and provide timely service.

## Deployment
RMS is deployed and accessible as a Minimal Viable Product (MVP) at the following URL: [https://restaurant-management-software.onrender.com](https://restaurant-management-software.onrender.com)

To explore the MVP, you can use the following login credentials:
- Manager's Password: 123456
- Waiter's Password: 111111

*Please note that this is a simplified version of the software, and additional features and improvements are under development.*

## Getting Started
To get started with the RMS project locally, follow these steps:

1. Clone the repository: `git clone git@github.com:Aleks2580/restaurant-management-software.git`
2. Install the dependencies:
  - Front-end: Open the terminal, navigate to the client folder, and run npm install.
  - Back-end: Open another terminal window, navigate to the server folder, and run npm install.
3. Configure the environment variables:
- Front-end: Create a .env file in the client directory and set the following environment variable: REACT_APP_API_URL=http://localhost:4000
- Back-end: Create a .env file in the server directory and modify it depending on your specific configuration. Make sure to set the required environment variables according to your setup, such as the database connection details and session secret: 
     - PORT=4000
     - DATABASE_URL=postgres://yourUserName:yourPassword@localhost:5433/yourDataBaseName
     - SESSION_SECRET=yourSessionSecret
4. Install and Set Up the Database:
   - Ensure that you have PostgreSQL installed on your system.
   - Open a terminal window and run the following commands:
       - npx sequelize db:create
       - npx sequelize db:migrate
       - npx sequelize db:seed:all

5. Start the development servers:
   - Front-end: In the terminal, navigate to the client folder and run npm start.
   - Back-end: In a separate terminal window, navigate to the server folder and run npm start.

