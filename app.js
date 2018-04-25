//Loading our app server using express
//also using nodemon
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('short'))
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
