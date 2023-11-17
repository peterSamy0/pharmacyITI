import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToRegular'
})
export class CamelToRegularPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

}
