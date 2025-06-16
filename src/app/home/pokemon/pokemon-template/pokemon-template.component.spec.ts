import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTemplateComponent } from './pokemon-template.component';

describe('PokemonTemplateComponent', () => {
  let component: PokemonTemplateComponent;
  let fixture: ComponentFixture<PokemonTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
