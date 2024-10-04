import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dropdownOpen=false;

  showDropdown() {
    this.dropdownOpen = true;
  }

  hideDropdown() {
    this.dropdownOpen = false;
  }

}
