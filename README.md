# Banking Application End-to-End Tests

# Overview
End-to-end testing of the XYZ Bank Demo Application using Playwright and TypeScript with the Page Object Model (POM) design pattern.

### Features
Features that are tested are: Customer Login, Deposit, Withdrawal, Transaction History and Form Validation.

# Table of contents

* [Getting Started](#get-started)
* [Setup Locally](#setup-locally)
* [Test Structure and Organization](#test-structure-organization)
* [Run the tests](#run-the-tests)
* [Generate testing report](#generate-testing-report)

## Getting Started
Make sure you have configured your git account and have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Setup Locally
 ```bash
 git clone https://github.com/YlberPllana/Banking-Project.git
 ```
 ```bash
 cd Banking-Project
 ```

#### Install project dependencies:
 ```bash
 npm install
 ```
 #### Install Playwright browsers:
```bash
npx playwright install
```

 ## Test Structure and Organization
* `src` folder - Source folder.
* `pages` folder - Contains Page Objects that adhere to the Page Object Model pattern.
* `test-data` folder - Contains test data used by the test suite.
* `tests` folder - Contains automated test cases.
* `AccountPage.ts` - Account page locators and methods.
* `LoginPage.ts` - Login page locators and methods.
* `BasePage.ts` - Common reusable page actions and helper methods.
* `customers.json` - Test data used during test execution.
* `.gitignore` file - Specifies files and folders ignored by Git.
* `package-lock.json` file - Contains the exact versions of installed dependencies.
* `package.json` file - Project configuration and npm scripts.
* `playwright.config.ts` file - Playwright configuration file.
* `README.md` file - Project documentation.

## Run the tests

#### Running tests
 ```bash
 npm run test
 ```

### Generate Testing report

HTML Testing Report is generated after test execution and can be found in the `playwright-report` folder.
 ```bash
 npm run report
 ```
### Screenshots
Screenshots are automatically generated during test execution and stored in the `screenshots` folder.

