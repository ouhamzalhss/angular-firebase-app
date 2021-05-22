import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFire';
  courses: Observable<any[]>;
  clients: Observable<any[]>;

  constructor(){
 
  }

  add(data){
   
  }


  updateClient(key,value){
 
  }

  deleteClient(key){
  }
}
