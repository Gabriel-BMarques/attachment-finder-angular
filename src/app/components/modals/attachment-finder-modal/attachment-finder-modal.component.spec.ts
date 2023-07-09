import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentFinderModalComponent } from './attachment-finder-modal.component';

describe('AttachmentFinderModalComponent', () => {
  let component: AttachmentFinderModalComponent;
  let fixture: ComponentFixture<AttachmentFinderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentFinderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentFinderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
