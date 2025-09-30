import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {
    // Initialize users array if not exists
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify([]));
    }
  }

  signup(name: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const emailLower = email.trim().toLowerCase();
    if (users.find((u: any) => u.email.toLowerCase() === emailLower)) {
      return false; // Email already exists
    }

    const newUser = { name: name.trim(), email: emailLower, password: password.trim() };
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const emailLower = email.trim().toLowerCase();
    const passTrim = password.trim();
    const user = users.find((u: any) => u.email.toLowerCase() === emailLower && u.password === passTrim);
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  private setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
