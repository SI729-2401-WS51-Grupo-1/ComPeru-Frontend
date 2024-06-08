import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../../../../shared/services/auth.service";

@Component({
  selector: 'app-auth-presentation-page',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatCard,
    MatIcon
  ],
  templateUrl: './auth-presentation-page.component.html',
  styleUrl: './auth-presentation-page.component.css'
})
export class AuthPresentationPageComponent {
  authService = inject(AuthService)

  ngOnInit() : void{
    this.authService.user$.subscribe(user =>{
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }

  logout(): void {
    //console.log('logout');
    this.authService.logout();
  }

}
