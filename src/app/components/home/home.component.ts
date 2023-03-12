import { Component } from '@angular/core';
import { SharedModule } from "@modules/shared/shared.module";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    SharedModule
  ]
})
export class HomeComponent {

}
