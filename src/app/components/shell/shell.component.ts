import { Component, HostListener } from '@angular/core';
import { SharedModule } from "@modules/shared/shared.module";
import { LoaderService } from '@services/loader/loader.service';
import { UtilitieService } from '@services/utilities/utilitie.service';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styles: [],
  imports: [
    SharedModule,
    HeaderComponent,
    SpinnerComponent
  ]
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
