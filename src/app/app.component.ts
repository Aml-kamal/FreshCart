import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layout/aditions/footer/footer.component";
import { NavbarComponent } from './layout/aditions/navbar/navbar.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ForgetPasswordComponent } from './layout/aditions/forget-password/forget-password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent ,NavbarComponent , RegisterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecomm';
}
