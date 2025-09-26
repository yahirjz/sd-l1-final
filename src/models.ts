import * as jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario

// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

//* Definimos un tipo llamado SearchOptions
//* Que puede tener dos propiedades opcionales: title y tag
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  
  //* Obtener todas las  pelis
  async getAll(): Promise<Peli[]> {
  // ruta absoluta al pelis.json en la raíz del proyecto
   const file = path.resolve(__dirname, "../pelis.json");
    return jsonfile.readFile(file)
  }

  //* Obtener por ID
  async getById(id: number){
    const peliculas = await this.getAll();
    const byId = peliculas.find(peli => peli.id === id)
    return byId;
  }

  //* Comprovar si se añadio la pelicula
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

      if (peliExistente) {
        return false;
      } else {
      // magia que agrega la pelicula a un objeto data
        const data = await this.getAll(); //* treaemos el array de peliculas 
        data.push(peli);
        await jsonfile.writeFile("../pelis.json", data);
        return true;
      }
  }

  //* Buscar peliculas
    async search(options:SearchOptions){
      const peliculas = await this.getAll();
      const filtrados = peliculas.filter(peli =>{
        let cumple = true;

        if(options.tag){
          cumple = cumple && peli.tags.includes(options.tag);
        }
        if(options.title){
          cumple = cumple && peli.title.includes(options.title)
        }
        return cumple;
      });
      return filtrados;
    }
}


 //---- codigo de prueba ------
//const pelicula1 = new PelisCollection();
//pelicula1.search({title: 'Son como niños', tag: 'comedia'}).then(resul => console.log(resul))


export { PelisCollection, Peli };
