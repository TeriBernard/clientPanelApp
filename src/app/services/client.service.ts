import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  client: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.clientsRef = this.db.list('clients');
    // following declaration code came from angularfire2 documentation
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getClients(){
    return this.clients;
  }

  // Fetch single client based on id. Called in client-details component
  getClient(id: string){
    this.client = this.db.object('/clients/'+id).valueChanges();
    return this.client;
  }

  // Add new client. Called in add-client component
  newClient(client: Client){
    this.clientsRef.push(client);
  }

  // Edit client information. Called in edit-client component
  updateClient(id:string, client:Client){
    return this.clientsRef.update(id, client);
  }

  // Delete client from database. Called in client-details component
  deleteClient(id:string){
    return this.clientsRef.remove(id);
  }
}
