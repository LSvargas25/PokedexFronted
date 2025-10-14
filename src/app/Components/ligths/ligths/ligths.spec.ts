import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ligths } from './ligths';

describe('Ligths', () => {
  let component: Ligths;
  let fixture: ComponentFixture<Ligths>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ligths]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ligths);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
