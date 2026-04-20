import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSettings } from './product-settings';

describe('ProductSettings', () => {
  let component: ProductSettings;
  let fixture: ComponentFixture<ProductSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
