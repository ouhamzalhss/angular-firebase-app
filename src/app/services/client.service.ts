import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientDoc: AngularFirestoreDocument<Client>;
  clientsCollections: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollections = this.afs.collection('clients');
    
  }

  getClients(user: string){
   // return this.clientsCollections.snapshotChanges().pipe(    // pour recuperer le tous documents
    return this.afs.collection('clients',ref=> ref.where('user','==',user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  createClient(client: Client){
    this.clientsCollections.add(client);
  }

  updateClient(client: Client){
   // recuperer le codument
    this.clientDoc = this.clientsCollections.doc<Client>(client.id);
    // modifier le document
    this.clientDoc.update(client);
  }

  getClient(id: string): Observable<Client>{
    return this.clientsCollections.doc<Client>(id).valueChanges();
  }

  deleteClient(id: string){
    // recuperer le codument
     this.clientDoc = this.clientsCollections.doc<Client>(id);
     // modifier le document
     this.clientDoc.delete();
   }

}

