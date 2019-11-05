// Required node packages
const inquirer = require(`inquirer`)
const mysql = require(`mysql2`)

//Connecting to your MySql Database
const db = mysql.createConnection({
  host: 'localhost',
  user: `root`,
  password: `password`,
  database: `bamazon_db`
})

const displayProducts = () => {
  //Display all Items In the Database
  db.query(`SELECT * FROM products`, (e, data) => {
    if (e) {
      console.log(e)
    }
    console.log(data)
  })
}
displayProducts()


const promptCustomer = () => {
  // Prompt user with two messages
  inquirer
    .prompt([
      {
        type: `number`,
        message: `What is the item ID of the product you would like to buy?`,
        name: `ID`
      },
      {
        type: `number`,
        message: `How many would you like to buy?`,
        name: `Quantity`
      }
    ])
    //Check if store has enough of the product to meet customers request.
    .then(function (number) {
      let item = number.ID
      let quantity = number.Quantity

      console.log(`Item ID: ${item}`)
      console.log(`Quantity: ${quantity}`)
    })
}
promptCustomer()