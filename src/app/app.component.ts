import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '@services/auth/firebase/auth.firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthFirebaseService
  ) { }

  ngOnInit(): void {
    this.authService.autoSignIn();
  }


}
