const express = require('express')
const routes = express.Router();

const Users = require('../src/model/Users')

const FormController = require('../src/controllers/formController')

routes.get('/',FormController.index)


module.exports = routes