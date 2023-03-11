import { Injectable, ElementRef } from "@angular/core";
import { Util } from "@app-modules/shared/utils/util";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilitieService {

  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();

  documentClickListener(componentRef: ElementRef, dropdownRef: ElementRef, target: HTMLElement): void {
    if (!componentRef.nativeElement.contains(target)) {
      if (dropdownRef.nativeElement.classList.contains('show')) {
        dropdownRef.nativeElement.classList.remove('show');
      }
    }
    else if (target.classList.contains('dropdown-toggle') || target.classList.contains('dropdown-item')) {
      Util.css.toggleClass(dropdownRef.nativeElement, 'show');
    }
 }
}
