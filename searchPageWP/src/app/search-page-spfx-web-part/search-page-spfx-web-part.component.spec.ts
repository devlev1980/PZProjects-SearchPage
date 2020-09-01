import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageSpfxWebPartComponent } from './search-page-spfx-web-part.component';

describe('SearchPageSpfxWebPartComponent', () => {
  let component: SearchPageSpfxWebPartComponent;
  let fixture: ComponentFixture<SearchPageSpfxWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageSpfxWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageSpfxWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
