import { TestBed } from '@angular/core/testing';

import { PokedScreenState } from './poked-screen-state';

describe('PokedScreenState', () => {
  let service: PokedScreenState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedScreenState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
