import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  mostrar: any;
  imatges: any[];




  constructor( private http: HttpClient) {
    const images={
      logo: "http://localhost:3080/imatges/logo",
      login: "http://localhost:3080/imatges/login",
      logout: "http://localhost:3080/imatges/logout",
    }

    this.imatges=[];
    this.imatges.push(images)

  }


  ngOnInit() {
    this.mostrar = localStorage.getItem('email');


    //@ts-ignore
    logout.onclick = function clear(){
      window.localStorage.clear()
      window.location.reload();
    }
  }


}
