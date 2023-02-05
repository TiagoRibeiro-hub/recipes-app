import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;

  constructor() { }

  set(loading: boolean) {
    this.loading = loading;
  }

  get(): boolean {
    return this.loading;
  }

}
