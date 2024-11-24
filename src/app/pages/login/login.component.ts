import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.login(this.formGroup.value).subscribe({
      next: response => {
        if (!response.success) {

          if (response.message.includes('error')) {
            this.errorMessage = 'Hubo un error al realizar el registro, por favor intentar denuevo';
            console.log(response.message);
            return;
          }

          this.errorMessage = response.message;
        }
        else {
          this.authService.setToken(response.data?.token!);
          this.router.navigate(['/home']);
          this.formGroup.reset();
        }
      },
      error: err => {
        this.errorMessage = 'Hubo un error al realizar el registro, por favor intentar denuevo';
        console.log(err);
      } 
    });

    this.isLoading = false;
  }
}
