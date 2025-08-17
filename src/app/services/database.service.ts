import { inject, Injectable } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';

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
}

