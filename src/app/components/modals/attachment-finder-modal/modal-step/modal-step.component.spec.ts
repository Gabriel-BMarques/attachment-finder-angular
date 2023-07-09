import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStepComponent } from './modal-step.component';

describe('ModalStepComponent', () => {
  let component: ModalStepComponent;
  let fixture: ComponentFixture<ModalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
