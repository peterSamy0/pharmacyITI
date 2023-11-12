import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, 'MMM d, y, h:mm a');
      return formattedDate || value;
    }
    return '';
  }
}
