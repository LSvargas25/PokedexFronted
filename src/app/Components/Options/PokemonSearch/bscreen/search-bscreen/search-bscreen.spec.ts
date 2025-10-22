import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBscreen } from './search-bscreen';

describe('SearchBscreen', () => {
  let component: SearchBscreen;
  let fixture: ComponentFixture<SearchBscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
