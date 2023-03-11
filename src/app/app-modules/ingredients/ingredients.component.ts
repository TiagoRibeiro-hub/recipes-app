import { Component } from '@angular/core';
import { SharedModule } from '@app-modules/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  imports: [
    SharedModule
  ]
})
export class IngredientsComponent {

}
