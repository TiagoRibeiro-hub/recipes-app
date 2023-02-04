import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { route } from 'src/app/constants/constants';
import { UtilitieService } from 'src/app/services/utilities/utilitie.service';
import { Util } from 'src/app/shared/utils/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @ViewChild('dropdownRef', {read: ElementRef}) dropdownRef: ElementRef;

  route = route;
  burger: HTMLInputElement;

  constructor(
    private _headerCompRef: ElementRef,
    private utilitieService: UtilitieService) { 

    }

  ngOnInit() {
      this.utilitieService.documentClickedTarget.subscribe(target => this.documentClickListener(target));
      this.burger = (<HTMLInputElement>document.getElementById("burger"));
  }

  toggleOpen() {
    Util.toggleClass(this.burger, 'show');
  }

  documentClickListener(target: any): void {
    this.utilitieService.documentClickListener(this._headerCompRef, this.dropdownRef, target);
  }

  @HostListener('window:resize') onResize() {
    if(window.innerWidth >= 992) {
      this.burger.classList.remove("show");
    }
  }
}
