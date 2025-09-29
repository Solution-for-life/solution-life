import { inject, Injectable } from '@angular/core';
import { Database, equalTo, get, orderByChild, push, query, ref, set, update, remove } from '@angular/fire/database';
import { Client } from '../interfaces/client';
import { Storage,deleteObject,getDownloadURL, ref as reference, uploadBytes } from '@angular/fire/storage';
import { Service } from '../interfaces/service';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private db = inject(Database);
  private readonly storage = inject(Storage);

  async getCollection(collectionName: string) {
    const collection = ref(this.db, collectionName);
    const snapshot = await get(collection);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async setItem(collectionName: string, data : Client | Service | Image) : Promise<void> {
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
    console.log(snapshot.val());
    return snapshot.exists() ? snapshot.val() : null;
  }
  async getImageURL(filePath: string): Promise<string> {
    try {
      console.log('entro al get image url', filePath);

      if (!filePath || filePath.trim() === '') {
        throw new Error('Invalid image path');
      }

      const storageRef = reference(this.storage, filePath.trim());
      return await getDownloadURL(storageRef);

    } catch (error) {
      console.error('Error en getImageURL:', error);
      // fallback a una imagen local si falla
      return 'assets/images/logo.png';
    }
  }

  async deleteItem(id: string, collectionName: string, filePath : string = '') {
    const collectionRef = ref(this.db, `${collectionName}/${id}`);
    await remove(collectionRef);

    if( collectionName === 'carouselImages' && filePath !== ''){
      // Eliminar imagen de la galeria
      const storageRef = reference(this.storage,filePath);
      await deleteObject(storageRef);
    }
  }
  async deleteCliente(id: string) {
    const collectionRef = ref(this.db, `clients/${id}`);
    await remove(collectionRef);
  }

}

