import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  formGroup!: FormGroup;
  selectedImage!: any;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private fireStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.setupForm();

    this.userService.getUserInfo().subscribe({
      next: response => {
        if (response.success) {
          this.userService.setUserInfo(response.data!);
          this.formGroup.patchValue({
            name: response.data?.name,
            email: response.data?.email,
            username: response.data?.username
          })
        }
      },
      error: err => {
        console.log(err)
      }
    });

  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')]],
    });
  }

  changeProfilePhoto(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      this.selectedImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userService.setUserInfo({
          ...this.userService.getUserInfoProvider(),
          image: reader.result as string
        });
      }
    }
  }

  async editProfile() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    
    // Upload image to firebase
    if (this.selectedImage) {
      const filePath = `profile-images/${this.selectedImage.name}`;
      const uploadTask = await this.fireStorage.upload(filePath, this.selectedImage);
      const url = await uploadTask.ref.getDownloadURL();

      // Preview image
      this.userService.setUserInfo({
        ...this.userService.getUserInfoProvider(),
        image: url
      });
    }

    this.formGroup.value.image = this.userService.getUserInfoProvider().image;
    this.userService.setUserInfo(this.formGroup.value);
    this.userService.udpateUserInfo(this.formGroup.value).subscribe({
      next: response => {
        if (response.success) {
          console.log(response);
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
