const express = require('express');
const router = express.Router();


router.get('/', (req,res) =>{
    res.render('index', {title:'My express app', message: 'hello world'});
});

module.exports = router;