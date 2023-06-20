import { TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';

describe(SignUpComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(SignUpComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(SignUpComponent);
  });
});
