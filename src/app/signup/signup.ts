import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) { }

  signup() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    if (this.authService.signup(this.name, this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Email already registered!');
    }
  }

}
