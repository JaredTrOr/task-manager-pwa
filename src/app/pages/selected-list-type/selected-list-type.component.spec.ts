import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedListTypeComponent } from './selected-list-type.component';

describe('SelectedListTypeComponent', () => {
  let component: SelectedListTypeComponent;
  let fixture: ComponentFixture<SelectedListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedListTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
