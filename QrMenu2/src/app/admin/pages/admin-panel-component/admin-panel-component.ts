import { Component, OnInit } from '@angular/core';
// import { UploadPhotoService } from '../../../services/upload-photo-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-panel-component.html',
  styleUrl: './admin-panel-component.css',
})
export class AdminPanelComponent implements OnInit {



  isSidebarOpen = false;
  constructor(private authService: AuthService, private router: Router) {}

   currentUser : any;

  ngOnInit(): void {
    this.currentUser  = this.authService['currentUserSubject'].value;

  }


  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


    // ✅ Logout fonksiyonu
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res.message); // backend’den gelen "Logout başarılı"
        // Frontend state temizleme (ör: localStorage)
        // Login sayfasına yönlendir
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout sırasında hata:', err);
      },
    });
  }









}
