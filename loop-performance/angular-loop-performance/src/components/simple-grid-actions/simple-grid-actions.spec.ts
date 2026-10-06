import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleGridActions } from './simple-grid-actions';

describe('SimpleGridActions', () => {
  let component: SimpleGridActions;
  let fixture: ComponentFixture<SimpleGridActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleGridActions],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleGridActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
