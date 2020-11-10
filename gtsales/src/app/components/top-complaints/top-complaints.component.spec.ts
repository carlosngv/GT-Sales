import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComplaintsComponent } from './top-complaints.component';

describe('TopComplaintsComponent', () => {
  let component: TopComplaintsComponent;
  let fixture: ComponentFixture<TopComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
