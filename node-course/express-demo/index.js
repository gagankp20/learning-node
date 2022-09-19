const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
const logger = require('./logger')
const express = require('express');
const debug = require('debug')('app:startup');
const  app = express();
const courses = require('./routes/courses')
const homepage = require('./routes/home')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(logger)
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use('/api/courses', courses)
app.use('/', homepage)


if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    debug('Morgan enabled')
}


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on ${port}`);
});