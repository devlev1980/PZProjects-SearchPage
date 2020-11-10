import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {SearchByAzService} from '../../services/search-by-az.service';
import {SaveSearchCharService} from '../../services/save-search-char.service';
import {ClearAllService} from '../../services/clear-all.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-a-z',
  templateUrl: './a-z.component.html',
  styleUrls: ['./a-z.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AZComponent implements OnInit, OnDestroy {
  @Input() azCharacters: Array<string> = [];
  selectedChar: number;
  @ViewChild('azRef', {static: false}) azRef: ElementRef;
  selectedCharOnPaging: string = '';
  selectedChars: string[] = [];
  private sink = new SubSink();

  constructor(private searchByAzService: SearchByAzService,
              private cdr: ChangeDetectorRef,
              private saveSearchCharService: SaveSearchCharService,
              private clearAllService: ClearAllService,
  ) {
  }

  /**
   * Click outside the character
   * @param targetElementPath: Array
   */
  @HostListener('click', ['$event.path'])
  public onGlobalClick(targetElementPath: Array<any>) {
    const elementRefInPath = targetElementPath.find(e => e === this.azRef.nativeElement);
    if (!elementRefInPath) {
    }
  }

  /**
   * Remove selected character on 'Clear all' button
   */

  ngOnInit() {
    this.sink.add(
      this.clearAllService.getSearch().subscribe((char) => {
        if (char.deleteClick) {
          this.selectedChar = null;
          this.selectedCharOnPaging = null;
          this.selectedChars = [];
          this.cdr.detectChanges();
        }
      })
    );
    this.sink.add(
      this.saveSearchCharService.getSavedChar().subscribe(char => {
        this.selectedChars = [];
        this.selectedChars.push(char);
      })
    );

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

  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
