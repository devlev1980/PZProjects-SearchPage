import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  /**
   * Highlight searched key in autocomplete
   * @param employee: string
   * @param searchTerm: any
   */
  transform(employee: string, searchTerm?: any): any {
    if (!employee || !searchTerm) {
      return employee;
    }
    const pattern = searchTerm
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');


    return (searchTerm) ? employee.replace(regex, match => `<b class="highlight" >${match}</b>`) : employee;
  }

}
