import { Component, HostListener } from '@angular/core';
import { LoaderService } from '@services/loader/loader.service';
import { UtilitieService } from '@services/utilities/utilitie.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  showLoader$ = this.loader.get$;

  constructor(
    private utilitieService: UtilitieService,
    private loader: LoaderService) {}

  @HostListener('document:click', ['$event']) documentClick(event: any): void {
    this.utilitieService.documentClickedTarget.next(event.target)
  }

}
