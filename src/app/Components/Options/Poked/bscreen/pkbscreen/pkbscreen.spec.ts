import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PKBscreen } from './pkbscreen';

describe('PKBscreen', () => {
  let component: PKBscreen;
  let fixture: ComponentFixture<PKBscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PKBscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PKBscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
