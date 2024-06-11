import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretCellComponent } from './secret-cell.component';

describe('SecretCellComponent', () => {
  let component: SecretCellComponent;
  let fixture: ComponentFixture<SecretCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ SecretCellComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
