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

  constructor(private searchService: SearchByEmployeeService,
              private cdr: ChangeDetectorRef,
              private passCharService: PassCharService) {
  }

  @HostListener('document:click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    const elementRefInPath = targetElementPath.find(e => e === this.azRef.nativeElement);
    if (!elementRefInPath) {
      this.searchService.setSearch({type: 'byAZ', value: '', deleteClick: false});
      this.selectedChar = null;
      this.selectedCharOnPaging = null;
    }
  }

  ngOnInit() {
  }

  /**
   * click on A-Z character and send selected to the 'Search service'
   * @param char: sting
   */
  onSelectedCharacter(char: string) {
    this.selectedChar = this.azCharacters.indexOf(char);
    this.selectedCharOnPaging = char;
    // this.searchService.setSearch({type: 'byAZ', value: char});
  }
}
