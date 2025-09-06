import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Database, get, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { User } from '@interfaces/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  showPass = signal(false);
  private readonly auth = inject(Auth);
  private readonly db = inject(Database);
  private readonly http = inject(HttpClient);
  private readonly apiKey = environment.firebase.apiKey;

  seePass() {
    this.showPass.update(v => !v);
  }


  async login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await response.user.getIdToken();
    const user = ref(this.db,`users/${response.user.uid}`)
    const snapshot = await get(user);
    if(!snapshot.exists()){
      throw new Error('No existe el usuario');
    }
    return {
      token,
      user: snapshot.val()
    }
  }

  async getToken(forceRefresh = false): Promise<string | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          const token = await user.getIdToken(forceRefresh);
          resolve(token);
        } else {
          resolve(null);
        }
      });
    });
  }

  async validateToken(token: string) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.apiKey}`;
      return await firstValueFrom(this.http.post(url, { idToken: token }));
  }

  async logout() {
    await this.auth.signOut();
  }

  async createUser(payload : User ) {
    const {email, password, name, lastName, confirmPassword} = payload;
    const credential = await createUserWithEmailAndPassword(this.auth, email,password);

    if(password !== confirmPassword){
      throw new Error('Passwords do not match');
    }

    await updateProfile(credential.user,{
      displayName: `${name} ${lastName}`
    })

    delete (payload as any).password;
    delete (payload as any).confirmPassword;

    await set(ref(this.db, `users/${credential.user.uid}`), {
      ...payload,
      id : credential.user.uid,
      updatedAt: null,
      createdAt: new Date().toISOString()
    });

    // await sendEmailVerification(credential.user);

    return {
      uid : credential.user.uid,
      email : credential.user.email
    }
  }
}
