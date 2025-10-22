import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAscreen } from './search-ascreen';

describe('SearchAscreen', () => {
  let component: SearchAscreen;
  let fixture: ComponentFixture<SearchAscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
