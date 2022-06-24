import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progess-barra',
  templateUrl: './progess-barra.component.html',
  styleUrls: ['./progess-barra.component.css']
})
export class ProgessBarraComponent implements OnInit {

  totalTareasCompletadas:number=0;
  totalTareas:number =0;
  constructor() { }

  ngOnInit(): void {

  }

}
