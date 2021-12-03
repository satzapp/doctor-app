import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/_helpers/validation';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  registerForm: FormGroup;
  submitted: boolean = false;
  loader: boolean = false;
  errors: Object = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      })
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      let payload = this.registerForm.value;
      delete payload.confirmPassword;
      this.authService.register(payload).subscribe((res) => {
        this.notification.showSuccess(res.attributes.message, 'Success');
        this.router.navigate(['login']);
      }, (err) => {
        if (err.error.attributes) {
          let errorResponse = err.error.attributes;
          this.errors = { ...this.errors, ...errorResponse };
        }
        this.loader = false;
      });
    }
  }
}