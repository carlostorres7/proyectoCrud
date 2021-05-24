import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  title="My firstApp Crud"
  visible=false;
  
  decirAdios() {
    this.visible = true;
    alert("hola dijo adios");
  }

  constructor() { }

  ngOnInit(): void {
  }
}
