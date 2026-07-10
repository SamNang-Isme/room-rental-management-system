import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  private authService = inject(Auth);
  private router = inject(Router);

  login() {

    this.authService.login(this.username, this.password).subscribe({

      next: (response: any) => {
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log("Login Failed");
        console.log(error);
      }

    });

  }

}