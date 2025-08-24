import { inject, Injectable } from '@angular/core';
import { Database, equalTo, get, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { Client } from '../interfaces/client';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private db = inject(Database);

  async getCollection(collectionName: string) {
    const collection = ref(this.db, collectionName);
    const snapshot = await get(collection);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async setItem(collectionName: string, data : Client | Service) : Promise<void> {
    if(data.id){
      const reference = ref(this.db, `${collectionName}/${data.id}`);
      await update(reference, {...data, updatedAt : new Date().toISOString()});
    }
    else{
      const newRef = push(ref(this.db, collectionName));
      await set(newRef, {...data, id: newRef.key, createdAt : new Date().toISOString()});
    }
  }

  async getItem(collectionName: string, id: string) : Promise<Client | Service | null> {
    const reference = ref(this.db, `${collectionName}/${id}`);
    const snapshot = await get(reference);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async getItemByUrl(collectionName: string, url: string) : Promise< Service | null> {
    const reference = ref(this.db, `${collectionName}`);
    const q = query(reference, orderByChild('url'), equalTo(url));
    const snapshot = await get(q);
    return snapshot.exists() ? snapshot.val() : null;
  }

}

