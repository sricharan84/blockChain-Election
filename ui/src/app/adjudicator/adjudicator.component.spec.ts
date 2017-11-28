import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicatorComponent } from './adjudicator.component';

describe('AdjudicatorComponent', () => {
  let component: AdjudicatorComponent;
  let fixture: ComponentFixture<AdjudicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjudicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjudicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
