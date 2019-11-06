// Required node packages
const inquirer = require(`inquirer`)
const mysql = require(`mysql2`)

//Connecting to your MySql Database
const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `password`,
  database: `bamazon_db`
})


// Prompt user with two messages
function promptCustomer() {
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
      //Print the customers request
      console.log(`Requested Item ID: ${item}`)
      console.log(`Requested Quantity: ${quantity}`)

      let selectQuery = `SELECT * FROM products WHERE ?`
      db.query(selectQuery, { item_id: item }, (e, data) => {
        if (e) {
          console.log(e)
        }
        //Validate item id data
        if (data.length === 0) {
          console.log(`Please enter a valid Item ID`)
          displayProducts()
        } else {
          let product = data[0]

          //check if product is in stock
          if (quantity <= product.stock_quantity) {
            //update the database with new item quantity
            let updateData = `UPDATE products SET quantity_stock = ` + (productData.stock_quantity - quantity) + `WHERE item_id = ` + item

            db.query(updateData, (e, data)=>{
              if(e){
                console.log(e)
              }
              console.log(`Your total is $` + productData.price * quantity)
              console.log(`Your order has been placed!`)

              db.end()
            })
          }else{
            console.log(`We're sorry, we are low in stock on your item`)
            console.log(`Please modify your order or choose another item.`)

            displayProducts()
          }
        }
      })
    })
}

//Display all Items In the Database
function displayProducts() {
  let selectQuery = `SELECT * FROM products`
  db.query(selectQuery, (e, data) => {
    if (e) {
      console.log(e)
    }
    console.log(`Products:`)
    let str = ``
    for (let i = 0; i < data.length; i++) {
      str = ``
      str += `Item ID: ` + data[i].item_id + `  - `
      str += `Product: ` + data[i].product_name + `  -  `
      str += `Department: ` + data[i].department_name + `  -  `
      str += `Price: $` + data[i].price + `\n`
      console.log(str)
    }
    console.log(`___________________________________________________________________________________________`)
  })
  promptCustomer()
}


//Run the Application
function runApp() {

  displayProducts()

}
runApp()