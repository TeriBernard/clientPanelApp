import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})

export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get ID from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      // first determine is client has balance; want to display field in corresponding color
      if(client.balance > 0) {
        this.hasBalance = true;
      }

      this.client = client;
      console.log(this.client);
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated!', {
      cssClass:'alert alert-success', timeout: 4000
    });
    this.router.navigate(['/client/'+ this.id]);
  }
  onDeleteClick(id: string) { 
    if(confirm('Are you sure you want to delete this client from the database?')){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client deleted!', {
        cssClass:'alert alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/client-details/'this.id]);
    }
    
  }

}
