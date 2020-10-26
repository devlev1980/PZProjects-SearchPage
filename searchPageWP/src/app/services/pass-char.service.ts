import {Injectable} from '@angular/core';
import {ISearchTerm, SearchService} from './search.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassCharService {
  private autocompleteStatus: Subject<boolean>;

  constructor() {
    this.autocompleteStatus = new Subject<boolean>();
  }


  setAutocompleteStatus(autocomplete: boolean) {
    this.autocompleteStatus.next(autocomplete);
  }

  getAutocomplete() {
    return this.autocompleteStatus.asObservable();
  }


}
