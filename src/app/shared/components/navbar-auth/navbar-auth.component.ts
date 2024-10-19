import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.css'
})
export class NavbarAuthComponent implements OnInit{
  isRegisterPage:boolean = false;

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.isRegisterPage = event.url === '/register';
      }
    })
  }

}
