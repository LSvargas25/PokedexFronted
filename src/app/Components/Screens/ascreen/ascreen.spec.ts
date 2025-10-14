import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AScreen } from './ascreen';

describe('AScreen', () => {
  let component: AScreen;
  let fixture: ComponentFixture<AScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
