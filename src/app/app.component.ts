import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthFirebaseService } from '@services/auth/firebase/auth.firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'advanced-preloading';

  constructor(
    private authService: AuthFirebaseService,
  ) { }

  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}

