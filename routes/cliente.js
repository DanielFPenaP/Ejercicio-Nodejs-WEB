var express = require('express');
var router = express.Router();

const axios =require('axios');
const fs = require('fs');

const html = 'public/clientes.html';
const reference = 'http://localhost:8081/clientes.json'

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Obteniendo datos de cliente.json
axios.get(reference).then(resp => {
  
  //recibiendo datos de los clientes en json
  const clientes = resp.data.clientes;
  
  //Leyendo pagina lista de clientes
  fs.readFile(html,(err,data)=> {
    //manejo de errores
    if(err){
      console.error(err);
      return;
    }
    //reescribiendo html con los nuevos valores
    fs.writeFile(html,data, (err)=>{
      //manejo de errores
      if(err) {
        return console.log(err);
    }
    //escribiendo datos nuevos
    var datos = "";
    clientes.forEach(element => {
      datos+= "<tr> <td>"+element.idcliente+
      "</td> <td>"+element.nombrecompania+
      "</td> <td>"+element.nombrecontacto+"</td> </tr>"
    });
    var temp = data.slice(0,data.indexOf("<tbody>")).toString()
              +datos+data.slice(data.indexOf("</tbody>"),data.length).toString();
    
    res.send(temp);
  });

  })
}).catch(err=> console.error(err));
  
});



module.exports = router;
