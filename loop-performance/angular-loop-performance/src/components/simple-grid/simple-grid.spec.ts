import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleGrid } from './simple-grid';

describe('SimpleGrid', () => {
  let component: SimpleGrid;
  let fixture: ComponentFixture<SimpleGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
