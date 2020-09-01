import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-a-z',
  templateUrl: './a-z.component.html',
  styleUrls: ['./a-z.component.scss']
})
export class AZComponent implements OnInit {
  @Input() azCharacters: Array<string> = [];
  selectedChar: number;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  onSelectedCharacter(char: string) {
    this.selectedChar = this.azCharacters.indexOf(char);
    this.searchService.setSearch({type: 'byAZ', value: char});
  }
}
