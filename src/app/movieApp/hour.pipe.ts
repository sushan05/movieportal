import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minToHourPipe'})
export class MinToHourPipePipe implements PipeTransform {
  transform(value: string) {
    let num = parseInt(value);
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "min";
  }
}