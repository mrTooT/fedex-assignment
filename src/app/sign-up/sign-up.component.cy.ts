import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from '../services/sign-up.service';

describe(SignUpComponent.name, () => {
  beforeEach(() => {
    cy.mount(SignUpComponent, {
      imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [SignUpService],
    });
  });

  it('renders', () => {
    cy.mount(SignUpComponent);
  });

  it('submit button should not be disabled when form validates', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('Blablabla');
    cy.get('[data-cy="button"]').should('not.be.disabled');
  });

  it('submit button should be disabled when email is not correct', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoetIsNoEmailAdress');
    cy.get('[data-cy="password"]').type('Blablabla');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled when password has fewer than 8 chars', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('Short');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should disabled when password has only lowercase chars', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('lowercase');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled when password has only uppercase chars', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('UPPERCASE');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled when password has the first name in it', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('RikPassword');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled when password has the first name in it', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('ToetenelPassword');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled when password has the first and last name in it', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('RikToetenelPassword');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('submit button should be disabled first when password has the first and last name in it, but when you later edit the names it will be not be disabled', () => {
    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('RikToetenelPassword');
    cy.get('[data-cy="button"]').should('be.disabled');
    cy.get('[data-cy="first-name"]').type('Other');
    cy.get('[data-cy="last-name"]').type('Name');
    cy.get('[data-cy="button"]').should('not.be.disabled');
  });

  it('should be submitting the data when clicked the submit button', () => {
    cy.mount(SignUpComponent, {
      imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [SignUpService],
      componentProperties: {
        onSubmit: cy.spy().as('onSubmitSpy'),
      },
    });

    cy.get('[data-cy="first-name"]').type('Rik');
    cy.get('[data-cy="last-name"]').type('Toetenel');
    cy.get('[data-cy="email"]').type('riktoet@gmail.com');
    cy.get('[data-cy="password"]').type('Blablabla');
    cy.get('[data-cy=button]').click();
    cy.get('@onSubmitSpy').should('have.been.called');
  });
});
