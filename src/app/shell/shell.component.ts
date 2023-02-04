import { Component, HostListener } from '@angular/core';
import { UtilitieService } from '../services/utilities/utilitie.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  constructor(private utilitieService: UtilitieService) {}

  @HostListener('document:click', ['$event']) documentClick(event: any): void {
    this.utilitieService.documentClickedTarget.next(event.target)
  }

}
