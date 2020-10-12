import { TestBed } from '@angular/core/testing';

import { ProcessHttpMsg.ServiceService } from './process-http-msg.service.service';

describe('ProcessHttpMsg.ServiceService', () => {
  let service: ProcessHttpMsg.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessHttpMsg.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
