import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  isLogin: boolean = true;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSwitchMode(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(): void {
    throw new Error('Method not implemented.');
  }
}
