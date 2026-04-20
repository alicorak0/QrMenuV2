import { Component } from '@angular/core';
import { AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//auth service gelecek
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth-service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { MeResponseModel } from '../../../models/meResponseModel';

declare var LoginJs: any;


@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements AfterViewInit {

  loginForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService) {

    this.createLoginForm();
  }





  ngAfterViewInit() {
    if (LoginJs) {
      LoginJs();
    }
  }

  createLoginForm() {

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],



    })


  }


  login() {
    if (this.loginForm.invalid) {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Hata');
      return;
    }

    const loginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe({
      next: () => {
        // Login başarılı → servis üzerinden user bilgilerini al
        this.authService.me().subscribe({
          next: () => {
            // artık component içinde currentUser=... yok
            this.toastrService.success('Giriş Başarılı', 'Hoşgeldiniz');
            //mesela burada kullanıcı bilgielrisi serviceden alabilirim
            // const user = this.authService['currentUserSubject'].value;
            // console.log(user?.fullName);


            this.router.navigate(['/admin']);
          },
          error: () => {
            this.toastrService.error('Kullanıcı bilgisi alınamadı', 'Hata');
          }
        });
      },
      error: err => {
        this.toastrService.error(err.error?.message || 'Giriş başarısız', 'Hata');
      }
    });
  }




}



