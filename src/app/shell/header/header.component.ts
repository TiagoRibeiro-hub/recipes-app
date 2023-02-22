import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { appRoute } from 'src/app/constants/routes';
import { UtilitieService } from 'src/app/services/utilities/utilitie.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Util } from 'src/app/shared/utils/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  @ViewChild('dropdownRef', { read: ElementRef }) dropdownRef: ElementRef;

  appRoute = appRoute;
  burger: HTMLInputElement;
  documentClickedTarget$: Subscription = undefined;

  constructor(
    private _headerCompRef: ElementRef,
    private utilitieService: UtilitieService,
    private dataStorageService: DataStorageService) {

  }

  ngOnDestroy(): void {
    if (this.documentClickedTarget$ !== undefined) {
      this.documentClickedTarget$.unsubscribe();
    }
  }

  ngOnInit() {
    this.documentClickedTarget$ = this.utilitieService.documentClickedTarget.subscribe((target: HTMLElement) => {
      this.utilitieService.documentClickListener(this._headerCompRef, this.dropdownRef, target);
    });
    this.burger = (<HTMLInputElement>document.getElementById("burger"));
  }

  toggleOpen() {
    Util.css.toggleClass(this.burger, 'show');
    this.setSpinarTop();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  @HostListener('window:resize') onResize() {
    if (window.innerWidth >= 992) {
      this.burger.classList.remove("show");
    }
    else if (window.innerWidth <= 992) {
      this.setSpinarTop();
    }

  }

  private setSpinarTop() {
    document.documentElement.style.setProperty('--spinner-top', (<HTMLInputElement>document.getElementById('navBar')).offsetHeight.toString());
  }
}
