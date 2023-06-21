
# FedEx Assignment

This is my FedEX assignment, I really enjoyed the challenge.
Especially the password validation with First + Last name, which took quite some effort.
Lastly it was fun to tryout Angular's newest features like Signals and Standalone components in combination with NX 

## Installation

Install the project by running:

```bash
npm install
```

Then start the Angular frontend app by running:

```bash
npm start
```

# Cypress Component Testing

You can test the Log-in Form Acceptance criteria with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/angular/overview), by running:

```bash
npm test
```

# Unit tests
`nx unit # runs unit test`

# Linting

`nx lint # runs linting with ESLint`


## Usage

This project uses:
- [NX](https://nx.dev/tutorials/angular-standalone-tutorial)
- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/angular/overview)
- Angular 16 with [Standalone components](https://angular.io/guide/standalone-components) and [Signals](https://angular.io/guide/signals)
- [Bulma](https://bulma.io/documentation/) CSS Library
- [Prettier](https://prettier.io/docs/en/install.html)
- [Linting with eslint](https://eslint.org/)

## Improvements

Things that I wanted to implement but did not have time for
- Unit tests
- Improvement of confirmation page
- Also cypress tests on validation messages instead of only submit button
- More cypress tests for other form fields



<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Start the app 

To start the development server run `nx serve fedex-assignment`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).
