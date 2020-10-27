import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveSearchCharService {
  private char: Subject<string>;

  constructor() {
    this.char = new Subject<string>();
  }

  getSavedChar() {
    return this.char.asObservable();
  }

  saveChar(char: string) {
    this.char.next(char);
  }


}
