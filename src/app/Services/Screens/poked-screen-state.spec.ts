import { TestBed } from '@angular/core/testing';
import { PokedService } from './poked-screen-state';

describe('PokedService', () => {
  let service: PokedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
