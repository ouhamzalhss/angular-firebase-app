import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
id: string;
client: Client = {
  firstName: "",
  lastName: "",
  email: "",
  phone: null,
  balance: 0
};
  constructor(  private route: ActivatedRoute, 
                private clientService: ClientService,
                private flashMessage: FlashMessagesService,
                private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(
    client => {
      this.client = client;
      console.log(this.client);
    }
)
  }

  updateClient(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client update succefully',{cssClass:'alert-success',timeout: 5000});
    this.router.navigate(['/client/',this.id]);
  }

}
