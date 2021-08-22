var express = require('express');
var router = express.Router();

const axios =require('axios');
const fs = require('fs');

const html = 'public/proveedores.html';
const reference = 'http://localhost:8081/proveedores.json'

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Obteniendo datos de proovedor.json
axios.get(reference).then(resp => {
  
  //recibiendo datos de los proovedores en json
  const proovedores = resp.data.proveedores;
  
  //Leyendo pagina lista de proovedores
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
    proovedores.forEach(element => {
      datos+= "<tr> <td>"+element.idproveedor+
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
