import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(
    private loader: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.headers.has('firebase')){
      return next.handle(req);
    }

    this.loader.set();
    const modifiedReq = req.clone({
      headers: req.headers.delete('firebase','true'),
    });

    return next.handle(modifiedReq)
    .pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          this.loader.unSet();
        }
      })
    );

   
  }
}
