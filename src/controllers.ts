import { promises } from "dns";
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection()
  }
//* obtencion de pelicula
// get siempre devuelve un array (aunque tenga un solo elemento o esté vacío).
 async get(options: Options): Promise<Peli[]>{
  
  if(!options){
    return await this.model.getAll();
  }
  if(options.id){
    const peli = await this.model.getById(options.id);
    return peli ? [peli]: []; // Devuelve un array con lapelicula o vacio si no existe
  }

  if(options.search){
    const peli = await this.model.search(options.search);
    return peli 
  }
 }
  
 //getOne devuelve directamente un solo objeto o undefined si no hay resultados.
  async getOne(options: Options): Promise<Peli | undefined> {
  return this.get(options).then(pelis => pelis[0]); // Devuelve el primer resultado
  }

  async add(peli:Peli): Promise<boolean>{
  return await this.model.add(peli);
  }

}







 //---- codigo de prueba ------
//const pelicula1 = new PelisController();
//pelicula1.get({id: 4}).then(resul => console.log(resul))
export { PelisController };
