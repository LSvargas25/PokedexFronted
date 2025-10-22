import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poked } from './poked';

describe('Poked', () => {
  let component: Poked;
  let fixture: ComponentFixture<Poked>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poked]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poked);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
