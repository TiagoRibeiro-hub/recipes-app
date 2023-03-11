import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Util } from "@app-modules/shared/utils/util";
import { appRoute } from '@constants/routes';
import { User } from '@models/user/user.model';
import { AuthFirebaseService } from '@services/auth/firebase/auth.firebase.service';
import { UtilitieService } from '@services/utilities/utilitie.service';
import { Subscription } from 'rxjs';




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
  userSubject$: Subscription = undefined;

  isAuth: boolean = false;

  constructor(
    private _headerCompRef: ElementRef,
    private utilitieService: UtilitieService,
    private authService: AuthFirebaseService) {

  }

  ngOnDestroy(): void {
    if (this.documentClickedTarget$ !== undefined) {
      this.documentClickedTarget$.unsubscribe();
    }
    if (this.userSubject$ !== undefined) {
      this.userSubject$.unsubscribe();
    }
  }

  ngOnInit() {
    this.userSubject$ = this.authService.userSubject.subscribe((user: User) => {
      this.isAuth = !!user;
    });

    this.documentClickedTarget$ = this.utilitieService.documentClickedTarget.subscribe((target: HTMLElement) => {
      this.utilitieService.documentClickListener(this._headerCompRef, this.dropdownRef, target);
    });
    this.burger = (<HTMLInputElement>document.getElementById("burger"));
  }

  onLogout(){
    this.authService.signOut();
  }

  toggleOpen() {
    Util.css.toggleClass(this.burger, 'show');
    this.setSpinarTop();
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
