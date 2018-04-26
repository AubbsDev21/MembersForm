//Loading our app server using express
//also using nodemon
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/create_user', (req, res) => {
  console.log("Creating new user")
  res.end()
})
app.get("/user/:id", (req, res) => {
  console.log("Featching the user by id " + req.params.id)

  // Connecting to the my sql database  
  const connction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'memberForm'
  })
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
//   "/" mean root dir
app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello")
})

app.get("/users", (req, res) => {
  const user1 = {FristName: "Aubre", Lastname: "Body"}
  const user2 = {FristName: "John", Lastname: "Man"}
  res.json([user1, user2])
  //res.send("Using nodemon")
})

app.listen(3000, () => {
  console.log("Server is up and running on port 3000..... ")
})
