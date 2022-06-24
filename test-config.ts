import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHeroesComponent } from './lista-heroes.component';

describe('app-todo-wrapper', () => {
  let component: app-todo-wrapper;
  let fixture: ComponentFixture<app-todo-wrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ app-todo-wrapper ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(app-todo-wrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});