import { TestBed } from '@angular/core/testing';

import { PokefronService } from './pokefron-service';

describe('PokefronService', () => {
  let service: PokefronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokefronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
