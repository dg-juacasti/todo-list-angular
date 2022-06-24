import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTodoComponent } from './eliminar-todo.component';

describe('EliminarTodoComponent', () => {
  let component: EliminarTodoComponent;
  let fixture: ComponentFixture<EliminarTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
