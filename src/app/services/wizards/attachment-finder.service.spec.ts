import { TestBed } from '@angular/core/testing';

import { AttachmentFinderService } from './attachment-finder.service';

describe('AttachmentFinderService', () => {
  let service: AttachmentFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
