var express = require('express');
var router = express.Router();
const axios = require('axios').default;

var manufacturer=['umpante', 'ippal', 'abiplos', 'okkau', 'niksleh', 'laion']

router.get('/beanies', function(req, res, next) {
    axios.get("https://bad-api-assignment.reaktor.com/v2/products/beanies").then(r=>{res.json(r.data)})
  
});

router.get('/gloves', function(req, res, next) {
    axios.get("https://bad-api-assignment.reaktor.com/v2/products/gloves").then(r=>{res.json(r.data)})
  
});
  
router.get('/facemasks', function(req, res, next) {
    axios.get("https://bad-api-assignment.reaktor.com/v2/products/facemasks").then(r=>{res.json(r.data)})
  
});

  module.exports = router;