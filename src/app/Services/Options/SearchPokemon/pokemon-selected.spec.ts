import { TestBed } from '@angular/core/testing';

import { PokemonSelected } from './pokemon-selected';

describe('PokemonSelected', () => {
  let service: PokemonSelected;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSelected);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
