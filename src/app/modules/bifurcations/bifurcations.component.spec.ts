import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BifurcationsComponent } from './bifurcations.component';

describe('BifurcationsComponent', () => {
  let component: BifurcationsComponent;
  let fixture: ComponentFixture<BifurcationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BifurcationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BifurcationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
