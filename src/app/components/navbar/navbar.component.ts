import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  userLoggedIn: string;
  constructor(private authService: AuthClientService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(
      auth => {
        if(auth){
           this.loggedIn = true;
           this.userLoggedIn = auth.email;
        }else{
          this.loggedIn = false;
        }
      }
    )
  }

  onLogout(){
   this.authService.logOut();
   this.flashMessage.show('logout successufully',{cssClass:'alert-success',timeout:3000});
   return this.router.navigate(['/login']);
  
  }

}
