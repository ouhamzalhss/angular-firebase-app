import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  clientDoc: AngularFirestoreDocument<Client>;
  clientsCollections: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollections = this.afs.collection('clients');
    this.clients = this.clientsCollections.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getContacts(){
    return this.clients;
  }
  createContact(contact: Client){
    this.clientsCollections.add(contact);
  }

  updateContact(contact: Client){
   // recuperer le codument
    this.clientDoc = this.clientsCollections.doc<Client>(contact.id);
    // modifier le document
    this.clientDoc.update(contact);
  }

  deleteContact(contact: Client){
    // recuperer le codument
     this.clientDoc = this.clientsCollections.doc<Client>(contact.id);
     // modifier le document
     this.clientDoc.delete();
   }

}

