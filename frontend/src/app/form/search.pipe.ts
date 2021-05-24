import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  respuesta: Array<any> = [];

  transform(value: Array<any>, arg: string): Array<any> {
    this.respuesta = [];
    if (arg) {
      value.filter( (element) => {
        if(element.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          this.respuesta.push(element)
        }
      })
    } else {
      this.respuesta = value;
    }
    return this.respuesta;
  }

}
