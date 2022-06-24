import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaListaComponent } from './actualiza-lista.component';

describe('ActualizaListaComponent', () => {
  let component: ActualizaListaComponent;
  let fixture: ComponentFixture<ActualizaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
