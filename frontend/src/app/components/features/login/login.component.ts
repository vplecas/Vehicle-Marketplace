import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.success = false;
    this.error = '';

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        data => {
          const payload = JSON.parse(window.atob(data.accessToken.split('.')[1]));

          this.loading = false;
          this.success = true;

          localStorage.setItem('user-admin', JSON.stringify({
            username: this.loginForm.value.email,
            token: data.accessToken,
            refreshToken: data.accessTokenRefresh,
            id: payload.id,
            role: payload.role
          }));

          console.log("Printamo sta smo sacuvali.")
          console.log(localStorage.getItem('user-admin'))

          this.router.navigate(['']);
        },
        error => {
          this.error = error.error ? error.error.message : 'Your account is not verified';
          this.loading = false;
        });
  }

}
