import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get$ = this.loading.asObservable();
  
  constructor() { }

  set() {
    this.loading.next(true);
  }

  unSet() {
    this.loading.next(false);
  }

}
