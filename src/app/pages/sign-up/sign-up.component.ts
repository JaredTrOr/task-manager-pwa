import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  formGroup!: FormGroup;
  isLoading: boolean = false;

  // Message error general
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.formGroup.value.image = '/assets/user-image.jpg'; // Set default image
    this.authService.signup(this.formGroup.value)
    .subscribe({
      next: response => {
        if (!response.success) {
          if (response.message.includes('error')) {
            this.errorMessage = 'Hubo un error al realizar el registro, por favor intentar denuevo';
            console.log(response.message);
            this.isLoading = false;
            return;
          }

          this.errorMessage = response.message;
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
          this.authService.setToken(response.data?.token!); 
          this.router.navigate(['/home']);
          this.formGroup.reset();
        }
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al realizar el registro, por favor intentar denuevo';
        console.log(err);
      }
    });

  }
}
