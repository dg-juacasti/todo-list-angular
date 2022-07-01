import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTodoComponent } from './actualizar-todo.component';

describe('ActualizarTodoComponent', () => {
  let component: ActualizarTodoComponent;
  let fixture: ComponentFixture<ActualizarTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
