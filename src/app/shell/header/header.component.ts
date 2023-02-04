import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { constants } from 'src/app/constants/constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Output() linkSelected = new EventEmitter<string>(); 
  @ViewChild('dropdownRef', {read: ElementRef}) dropdownRef: ElementRef;
  @ViewChild('burgerRef', {read: ElementRef}) burgerRef: ElementRef;

  constant = constants;
  
  onSelect(link: string) {
    this.linkSelected.emit(link);
  }

  toggleOpen(type: string = 'dropdown') {
    switch (type){
      case 'dropdown':
        this.dropdownRef.nativeElement.click();
        break;
      case 'burger':
        this.burgerRef.nativeElement.click();
        break;
    }
  }
}
