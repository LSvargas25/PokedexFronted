import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bscreen } from './bscreen';

describe('Bscreen', () => {
  let component: Bscreen;
  let fixture: ComponentFixture<Bscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
