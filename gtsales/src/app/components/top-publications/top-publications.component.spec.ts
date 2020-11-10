import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPublicationsComponent } from './top-publications.component';

describe('TopPublicationsComponent', () => {
  let component: TopPublicationsComponent;
  let fixture: ComponentFixture<TopPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
