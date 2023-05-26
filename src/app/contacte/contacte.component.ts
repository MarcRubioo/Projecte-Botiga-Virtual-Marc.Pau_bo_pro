import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.css']
})
export class ContacteComponent {
  user: { name: any; email: any; dob: any; picture: any;  } | undefined;

  constructor(private http: HttpClient){

  }


  ngOnInit(){

    this.http.get('https://randomuser.me/api/').subscribe((response: any) => {
      this.user = {
        name: response.results[0].name,
        email: response.results[0].email,
        dob: response.results[0].dob,
        picture: response.results[0].picture
      };
    });
  }
}


