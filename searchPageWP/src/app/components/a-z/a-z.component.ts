import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {SearchByEmployeeService} from '../../services/search-by-employee.service';
import {PassCharService} from '../../services/pass-char.service';
import {SearchByAzService} from '../../services/search-by-az.service';
import {SaveSearchCharService} from '../../services/save-search-char.service';

@Component({
  selector: 'app-a-z',
  templateUrl: './a-z.component.html',
  styleUrls: ['./a-z.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AZComponent implements OnInit {
  @Input() azCharacters: Array<string> = [];
  selectedChar: number;
  @ViewChild('azRef') azRef: ElementRef;
  selectedCharOnPaging: string = '';
  selectedChars: string[] = [];
  constructor(private searchByAzService: SearchByAzService,
              private cdr: ChangeDetectorRef,
              private saveSearchCharService: SaveSearchCharService,
              private passCharService: PassCharService) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    const elementRefInPath = targetElementPath.find(e => e === this.azRef.nativeElement);
    if (!elementRefInPath) {
      this.searchByAzService.setSearch({type: 'byAZ', value: '', deleteClick: true});
      this.selectedChar = null;
      this.selectedCharOnPaging = null;
    }
  }

  ngOnInit() {
    this.saveSearchCharService.getSavedChar().subscribe(char => {
      this.selectedChars = [];
      this.selectedChars.push(char);
    });
  }

  /**
   * click on A-Z character and send selected to the 'Search service byAZ'
   * @param char: sting
   */
  onSelectedCharacter(char: string) {
    this.selectedChar = this.azCharacters.indexOf(char);
    this.selectedCharOnPaging = char;
    this.selectedChars = [];
    this.searchByAzService.setSearch({type: 'byAZ', value: char, deleteClick: false});

    this.cdr.detectChanges();
  }
}
