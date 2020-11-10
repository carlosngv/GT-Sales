import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDislikesComponent } from './top-dislikes.component';

describe('TopDislikesComponent', () => {
  let component: TopDislikesComponent;
  let fixture: ComponentFixture<TopDislikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDislikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDislikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
