import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  showLoader = signal(false);

  setLoader(value: boolean) {
    this.showLoader.update(v => value);
  }

}
