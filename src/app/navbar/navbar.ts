import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('currentUser'); // مسح المستخدم الحالي
    this.router.navigate(['/login']);        // تحويل للصفحة Login
  }
}
