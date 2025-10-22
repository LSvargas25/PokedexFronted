import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PKAscreen } from './pkascreen';

describe('PKAscreen', () => {
  let component: PKAscreen;
  let fixture: ComponentFixture<PKAscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PKAscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PKAscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
