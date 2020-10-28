import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailschartComponent } from './detailschart.component';

describe('DetailschartComponent', () => {
  let component: DetailschartComponent;
  let fixture: ComponentFixture<DetailschartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailschartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
