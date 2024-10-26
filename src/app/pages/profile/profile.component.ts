import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userInfo!: User;
  formGroup!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: response => {
        if (response.success) {
          this.userInfo = response.data!;
          console.log(this.userInfo)
        }
      },
      error: err => {
        console.log(err)
      }
    });

    this.setupForm();
  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')]],
    });
  }

  editProfile() {
    
  }

}
