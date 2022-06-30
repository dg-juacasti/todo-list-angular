import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessBarraComponent } from './progess-barra.component';

describe('ProgessBarraComponent', () => {
  let component: ProgessBarraComponent;
  let fixture: ComponentFixture<ProgessBarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgessBarraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgessBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
