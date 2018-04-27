MembersForm w/ node.js
===========

An example informaton form used with node.js and mysql 

## Examples
* Database
![database_2](https://user-images.githubusercontent.com/16025198/39382449-84090a6a-4a33-11e8-9858-3b945bea7fe9.gif)


## Nodejs Dependencies
* express
* morgan
* body-parser
* mysql
## Examples from code
Allow our backend to connent on a local server
~~~bash
app.listen(3000, () => {
  console.log("Server is up and running on port 3000..... ")
})
~~~~
Setting dependency variables we use "const" because we dont want to these values to change, Then we app.use these libraries.

~~~~bash 
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use(morgan('short'))
~~~~
Creating a connection pool to make this functionality more dynamic, to prevent from reusing code
~~~~bash
//conntion pool 
const pool = mysql.createPool({
  connectionLimit : 10, 
   host: 'localhost',
    user: 'root',
    database: 'Members_Form'
})

~~~~
Then we create a function to return the values
~~~~bash
function Sqlconnection() {
  return pool
}
~~~~
Posting and connenting users values to the Mysql Database
~~~bash
//posting data onto sql database
app.post('/create_user', (req, res) => {
  console.log("Creating new user")
  console.log("Frist Name" + req.body.create_Frist_name)
  const fristname = req.body.create_Frist_name
  const lastname = req.body.create_last_name
  const Address = req.body.create_address_1
  const Address2 = req.body.create_address_2
  const City = req.body.create_city
  const Zipcode = req.body.create_zip
  const connction = Sqlconnection()
  const queryString = "INSERT INTO users (Fristname1, LastName, address, address2, city, zip) VALUES (?, ?, ?, ?, ?, ?)"
  //the action of inserting data 
  connction.query(queryString, [fristname,lastname,Address,Address2,City,Zipcode],(err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }
     //redirecting users to the thank you page
    res.redirect('../Thanks.html');
    console.log("success Inserted new user with id of: " + results.insertedId);
  })
~~~~
Fetching users data and putting it into JSON format
~~~bash
app.get("/user/:id", (req, res) => {
  console.log("Featching the user by id " + req.params.id)

  // Connecting to the my sql database  
  const connction = Sqlconnection()


   //fetching the values in the table then putting them in json format
   const sqlString = "SELECT * FROM users WHERE id = ?"
   const userid = req.params.id
  connction.query(sqlString,[userid] , (err, rows, fields) => {
    if (err) {
      console.log( err)
      res.sendStatus(500)
      return
    }
    console.log("vlaues are being qurey")
    res.json(rows)
  })
})


~~~
