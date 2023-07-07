import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentFinderButtonComponent } from './attachment-finder-button.component';

describe('AttachmentFinderButtonComponent', () => {
  let component: AttachmentFinderButtonComponent;
  let fixture: ComponentFixture<AttachmentFinderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentFinderButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentFinderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
