import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTodoTrackingComponent } from './select-todo-tracking.component';

describe('SelectTodoTrackingComponent', () => {
  let component: SelectTodoTrackingComponent;
  let fixture: ComponentFixture<SelectTodoTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTodoTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTodoTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
