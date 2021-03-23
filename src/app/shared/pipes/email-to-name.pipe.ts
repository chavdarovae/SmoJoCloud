import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailToName'
})
export class EmailToNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.match(/(.*)+(?=@)/g)[0];
  }
}
