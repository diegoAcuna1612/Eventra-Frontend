import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-confirm-password',
  standalone: true,
    imports: [
        FormsModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './confirm-password.component.html',
  styleUrl: './confirm-password.component.css'
})
export class ConfirmPasswordComponent {

}
