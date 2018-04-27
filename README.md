MembersForm w/ node.js
===========

An example informaton form used with node.js and mysql 

## Example of the Form


## Nodejs Dependencies
* express
* morgan
* body-parser
* mysql
## Examples from code

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

