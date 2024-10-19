import { Component } from '@angular/core';
import {User} from '../../model/user';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    SidebarComponent
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  user: User = {
    id: '78231412',
    username: 'Gustyes',
    fullname: '',
    email: 'byroyzgg@gmail.com',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/34c63062a481ae39cff589f67803156d9da846fce3ba350d925d8a7e8e8ee930?placeholderIfAbsent=true&apiKey=493704e98b76408d8785bb427786fc81',
    birthdate: '',
    dni: '',
    country: '',
    gender: '',
    address: '',
    phone: '',

  };
}
