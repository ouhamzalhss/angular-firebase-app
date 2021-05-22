import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0,
    user: ''
  }

  constructor(
    private clientService: ClientService, 
    private authClientService: AuthClientService,
    private route: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authClientService.getAuth().subscribe(auth=>{
      this.client.user = auth.uid;
    })
  }

  addClient(){
       this.clientService.createClient(this.client);
       this.flashMessage.show('client add succefully',{cssClass:'alert-success',timeout: 5000});
       this.route.navigate(['/']);
  }

}
