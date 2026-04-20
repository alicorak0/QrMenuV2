import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryaddcomponent } from './categoryaddcomponent';

describe('Categoryaddcomponent', () => {
  let component: Categoryaddcomponent;
  let fixture: ComponentFixture<Categoryaddcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryaddcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryaddcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
