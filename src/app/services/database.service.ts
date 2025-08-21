import { inject, Injectable } from '@angular/core';
import { Database, get, push, ref, set, update } from '@angular/fire/database';
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
}

