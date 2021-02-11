var express = require('express');
var router = express.Router();
const axios = require('axios').default;

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get("https://bad-api-assignment.reaktor.com/v2/products/gloves").then(r=>{res.json(r.data)})

});

module.exports = router;
