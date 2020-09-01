import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AZComponent } from './a-z.component';

describe('AZComponent', () => {
  let component: AZComponent;
  let fixture: ComponentFixture<AZComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AZComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
