import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id: string;
  showBalance: boolean = false;

  client: Client = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    balance: null
  }

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessagesService) { 

               
              }

  ngOnInit() {
   this.id = this.route.snapshot.params['id'];
   this.clientService.getClient(this.id).subscribe(
    client => {
      this.client = client;
      console.log(this.client);
    }
)

  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('balance update succefully',{cssClass:'alert-success',timeout: 5000});
}

deleteClient(id: string){
  if(confirm('are you sure to delete this client')){
    this.clientService.deleteClient(id);
    this.flashMessage.show('client delete succefully',{cssClass:'alert-danger',timeout: 5000});
    this.router.navigate(['/']);
  }
 

}

}
