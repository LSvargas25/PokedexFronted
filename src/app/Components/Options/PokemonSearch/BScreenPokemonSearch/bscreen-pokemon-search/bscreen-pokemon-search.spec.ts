import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BScreenPokemonSearch } from './bscreen-pokemon-search';

describe('BScreenPokemonSearch', () => {
  let component: BScreenPokemonSearch;
  let fixture: ComponentFixture<BScreenPokemonSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BScreenPokemonSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BScreenPokemonSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
