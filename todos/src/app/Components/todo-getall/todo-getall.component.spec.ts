import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGetallComponent } from './todo-getall.component';

describe('TodoGetallComponent', () => {
  let component: TodoGetallComponent;
  let fixture: ComponentFixture<TodoGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoGetallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
