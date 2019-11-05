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

// Prompt user with two messages
const promptCustomer = () => {
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


//Display all Items In the Database
const displayProducts = () => {
  selectQuery = `SELECT * FROM products`
  db.query(selectQuery, (e, data) => {
    if (e) {
      console.log(e)
    }
    console.log(`Products:`)
    let str = ``
    for (let i = 0; i < data.length; i++) {
      str = ``
      str += `Item ID: ` + data[i].item_id + `  - `
      str += 'Product: ' + data[i].product_name + '  -  '
      str += 'Department: ' + data[i].department_name + '  -  '
      str += 'Price: $' + data[i].price + '\n'
      console.log(str)
    }
    console.log(`___________________________________________________________________________________________`)
  })
  promptCustomer()
}


//Run the Application
const runApp = () =>  {

  displayProducts()

}
runApp()