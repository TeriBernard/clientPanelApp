import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit: boolean = true;

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
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
     if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert alert-danger', timeout: 4000
      });
      this.router.navigate(['edit-client']);
    } else {
      // Update Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client information updated!', {
        cssClass:'alert alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id]);

    }
  }

}
