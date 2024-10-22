import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'] // Fix plural 'styleUrls'
})
export class CreateTaskComponent implements OnInit {

  formGroup!: FormGroup;
  createReminder: string = 'yes';
  tipoUnidad: string[] = ['minutos', 'horas', 'días'];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      listType: ['', Validators.required],
      reminderAmount: [''],
      reminderUnitType: [''],
      createReminder: ['yes', Validators.required]
    });
  }

  onSubmit(): void {

    console.log(this.formGroup.value);

    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }


  }
}
