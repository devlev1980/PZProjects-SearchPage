import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-a-z',
  templateUrl: './a-z.component.html',
  styleUrls: ['./a-z.component.scss']
})
export class AZComponent implements OnInit {
  @Input() azCharacters: Array<string> = [];
  selectedChar: number;
  @ViewChild('azRef') azRef: ElementRef;

  constructor(private searchService: SearchService) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    const elementRefInPath = targetElementPath.find(e => e === this.azRef.nativeElement);
    if (!elementRefInPath) {
      this.searchService.setSearch({type: 'byAZ', value: ''});
      this.selectedChar = null;
    }
  }

  ngOnInit() {
  }

  onSelectedCharacter(char: string) {
    this.selectedChar = this.azCharacters.indexOf(char);
    this.searchService.setSearch({type: 'byAZ', value: char});
  }
}
