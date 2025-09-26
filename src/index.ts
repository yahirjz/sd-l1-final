import minimist from "minimist";
import { PelisController } from "./controllers"; // importación de controller



function parseaParams(argv) {
  const resultado = minimist(argv);
    
    
    
    if(resultado._.includes('search')){
      //sacamos el resultado de _ 
      const{_, ...res} = resultado;
      return ({search: res});
      
    }else if(resultado._.includes('get')){
      const indexGet =resultado._.indexOf('get');
      
      const id =resultado._[indexGet + 1];
      return{  id: Number(id)};

    }else if(resultado._.includes('add')){
      const parametros ={
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags
      }
     
      return{parametros};
    }
    return  
}

async function main() {

  // Leemos los argumentos de entrada y los mandamos a la función para operaciones necesarias
  const params = parseaParams(process.argv.slice(2));
  // Instancia de pelisController
  const peliController = new PelisController();

  // Si el comando es 'add', llamamos a add
  if (params && params.parametros) {
    const resultado = await peliController.add(params.parametros);
    console.log(resultado);
  } else {
    // Si no, ejecutamos get normalmente
    const resultado = await peliController.get(params);
    console.log(resultado);
  }
}

main();
