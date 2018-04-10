
var express=require('express');
var Router=express.Router();

Router.use('/Home',require('./Controllers/HomeController'));


module.exports=Router;
