import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptCreditsComponent } from './topt-credits.component';

describe('ToptCreditsComponent', () => {
  let component: ToptCreditsComponent;
  let fixture: ComponentFixture<ToptCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToptCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToptCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
