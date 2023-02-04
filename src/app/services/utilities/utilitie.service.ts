import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Util } from 'src/app/shared/utils/util';

@Injectable({
  providedIn: 'root'
})
export class UtilitieService {

  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();

  documentClickListener(componentRef: ElementRef, dropdownRef: ElementRef, target: any): void {
    if (!componentRef.nativeElement.contains(target)) {
      if (dropdownRef.nativeElement.classList.contains('show')) {
        dropdownRef.nativeElement.classList.remove('show');
      }
    }
    else if (target.classList.contains('dropdown-toggle')) {
      Util.toggleClass(dropdownRef.nativeElement, 'show');
    }
 }
}
