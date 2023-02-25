import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;

  constructor() { }

  set() {
    this.loading = true;
  }

  unSet() {
    this.loading = false;
  }

  get(): boolean {
    return this.loading;
  }

}
