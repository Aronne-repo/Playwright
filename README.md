# Playwright UI Test Automation Framework

Automated UI test framework built with TypeScript and Playwright.
Designed with a scalable structure based on modern E2E testing best practices, including Page Object Model, storageState authentication and reusable fixtures, and ready for CI/CD integration.

---

## Technical Stack

- Node.js
- Playwright
- TypeScript
- dotenv (environment management)
- StorageState authentication
- 

---

## Project Structure
```
PLAYWRIGHT/
│
├── .auth/                 # storageState (authenticated session)
├── fixtures/              # test data / static datasets
├── pages/                 # Page Object Models
├── tests/                 # test specs (.spec.ts)
├── test-results/          # execution artifacts (auto-generated)
├── node_modules/
├── playwright.config.ts
└── env.ts
```
## Install dependencies
```
npm install
```
## Install Playwright browsers
```
npx playwright install
```
## First run (verify setup)
```
npx playwright test
```
## Run all tests (headless mode)
```
npx playwright test
```
## Run all tests in headed mode
```
npx playwright test --headed
```
## Run a specific spec file
```
npx playwright test tests/login.spec.ts
```
## Run a specific spec in headed mode
```
npx playwright test tests/login.spec.ts --headed
```
## Authentication strategy

This framework uses storageState-based authentication:

- Login is executed once in auth.setup.ts
- Session is saved in:
- .auth/user.json
- All tests reuse the authenticated state

## Environment variables

Environment variables are managed using .env + dotenv.
- Example .env:
```
USERNAME=Admin
PASSWORD=admin123
```
## Architecture highlights
- Page Object Model (POM) for maintainability
- Reusable fixtures for test data
- StorageState authentication (no repeated login)
- Component-based locators (header, sidebar, dropdown)
- Regex-based assertions for resilient URL checks
- Stable selectors based on Playwright locator engine

## CI/CD ready

This framework can be easily integrated with:
- GitHub Actions
- Jenkins
- GitLab CI
- Azure DevOps

**Example CI command**:
```
npx playwright test --reporter=html
```
## Reporting
Playwright HTML report:
```
npx playwright show-report
```
