import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loader: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log('isLoggedIn', this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['doctor']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async submitLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loader = true;
      this.authService.login(this.loginForm.value).subscribe((res) => {
        this.notification.showSuccess(res.attributes.message, 'Success');
        this.authService.setToken(res.attributes.token);
        this.router.navigate(['doctor']);
      }, (err) => {
        this.notification.showError(err.error.attributes.message, 'Error');
        this.loader = false;
      });
    }
  }
}