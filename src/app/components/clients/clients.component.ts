import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  searchClients: Client[];
  query: string = '';
  total: number = 0;

  constructor(private clientService: ClientService,
              private authClientService: AuthClientService,
              private flashMessage: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
      this.authClientService.getAuth().subscribe(auth=>{
            this.clientService.getClients(auth.uid).subscribe(data=>{
             this.searchClients = this.clients = data;
              this.total = this.getTotal();
            });
      });
      
  }

  getClients(){

  }

  getTotal() {
    return this.clients.reduce((som,client)=>{
        return som + parseFloat(client.balance.toString());
    },0)
  }

  deleteClient(id: string){

    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.clientService.deleteClient(id);
        this.flashMessage.show('client delete succefully',{cssClass:'alert-danger',timeout: 5000});
        this.router.navigate(['/']);

        swal.fire({
          title: 'Deleted',
          text: "Client is deleted succefully",
          type: 'success',
          timer: 2000
        }
        )
      }
    })

  }
   
  onSearch(){
    this.searchClients = (this.query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(this.query.toLowerCase()) || client.lastName.toLowerCase().includes(this.query.toLowerCase())) : this.clients;
  }

}
