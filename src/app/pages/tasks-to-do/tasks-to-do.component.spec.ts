import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksToDoComponent } from './tasks-to-do.component';

describe('TasksToDoComponent', () => {
  let component: TasksToDoComponent;
  let fixture: ComponentFixture<TasksToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksToDoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
