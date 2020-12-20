import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGenerationComponent } from './lista-generation.component';

describe('ListaGenerationComponent', () => {
  let component: ListaGenerationComponent;
  let fixture: ComponentFixture<ListaGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
