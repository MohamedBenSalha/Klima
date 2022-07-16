import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectAngular';
  co2: number = 2;
  result: any = "";
  response = false;

  constructor(private http: HttpClient) {

  }

  doSomething() {
    this.http.post("http://127.0.0.1:5000/doSomething", {"number": this.co2}).subscribe(
      response =>  {
        console.log(response)
        this.result = response; this.response = true;
      }
    )
    ;
  } }
