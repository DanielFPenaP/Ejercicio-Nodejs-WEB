var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var proveedorRouter = require('./routes/proveedor');
var clienteRouter = require('./routes/cliente');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/api/clientes', clienteRouter);
app.use('/api/proveedores', proveedorRouter);

module.exports = app;
