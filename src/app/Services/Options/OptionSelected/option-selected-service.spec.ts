import { TestBed } from '@angular/core/testing';

import { OptionSelectedService } from './option-selected-service';

describe('OptionSelectedService', () => {
  let service: OptionSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
