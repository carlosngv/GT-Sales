import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikesComponent } from './top-likes.component';

describe('TopLikesComponent', () => {
  let component: TopLikesComponent;
  let fixture: ComponentFixture<TopLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
