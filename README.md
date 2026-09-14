# E2E, API, and BDD (Behaviour-Driven Development) Project
Suite of demonstrative E2E and API tests, implemented using Playwright, Bruno CLI, and Gherkin. Developed as part of the requirements for certification in the *Test and Automation Engineer* programme for the *Talento Ready* Initiative of *Desafío Latam* and *SENCE* (Republic of Chile's National Service of Capacitation and Employment).

## Project structure

Files are organised as tests, specs, POM (Page Object Model), test reports, and Gherkin features. These are distributed in directories as follows:
```
/e2e-api-bdd-tests/
├── .github/
│   └── workflows/
│       ├── bruno.yml
│       └── playwright.yml
├── api/
│   ├── reports/
│   └── tests/
├── bdd/
│   ├── login.feature
│   └── register.feature
├── bulk_data/
│   ├── clients-invalid.csv
│   ├── clients-valid.csv
│   ├── collection-invalid.csv
│   ├── collection-valid.csv
│   ├── invoices-invalid.csv
│   ├── invoices-valid.csv
│   ├── products-invalid.csv
│   └── products-valid.csv
├── e2e/
│   └── reports/
│       ├── GithubActions/
│       ├── html/
│       ├── screenshots/    # Reference screenshots captured during tests
│       └── videos/    # Reference videos captured during tests
│   └── tests/
│       ├── clients/
│       │   ├── clients-creation.spec.js
│       │   ├── clients-deletion.spec.js
│       │   └── clients-mgmt.spec.js
│       ├── collection/
│       │   ├── collection-creation.spec.js
│       │   ├── collection-deletion.spec.js
│       │   └── collection-mgmt.spec.js
│       ├── invoices/
│       │   ├── invoices-creation.spec.js
│       │   ├── invoices-deletion.spec.js
│       │   └── invoices-mgmt.spec.js
│       ├── pom/
│       │   ├── ClientsPage.js
│       │   ├── CollectionPage.js
│       │   ├── InvoicesPage.js
│       │   ├── LoginPage.js
│       │   ├── Page.js
│       │   └── ProductsPage.js
│       ├── products/
│       │   ├── products-creation.spec.js
│       │   ├── products-deletion.spec.js
│       │   └── products-mgmt.spec.js
│       └── roles/
│           └── salesman.spec.js
├── node_modules/      # This folder and its contents are ignored by Git.
├── secrets/      # This folder and its contents are ignored by Git.
│   └── .env.development
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.ts          # Playwright config file
├── README.md
```

The `bdd/` folder contains Gherkin behaviour specs (BDD) that document app
behaviour in business language. They are `.feature` files only (no step
definitions).

The `api` folder contains the Bruno CLI files to test the API endpoints directly.

As for the `e2e` folder, it contains the Playwright tests. Naming convention: `<feature>-<accion>.spec.js`, one folder per feature.

## Flows covered by E2E tests

**Creation**

| Spec | Menu path |
|------|-----------|
| `clients/clients-creation.spec.js` | Clients Management > Clients > Create Client |
| `products/products-creation.spec.js` | Products Management > Products > Create Product |
| `invoices/invoices-creation.spec.js` | Invoices Management > Invoices > Create Invoice |
| `collection/collection-creation.spec.js` | Payments Collection Management > Collection > Create a Payment Collection |

**Search / Modify / Delete**

| Spec | Menu path |
|------|-----------|
| `clients/clients-mgmt.spec.js` | Clients Management > Clients |
| `products/products-mgmt.spec.js` | Products Management > Products |
| `invoices/invoices-mgmt.spec.js` | Invoices Management > Invoices |
| `collection/collection-mgmt.spec.js` | Payments Collection Management > Collection |

Each `-mgmt` test spec covers: 
* searching the list (by keyword, and date range where available),
* opening the edit form (`/{recurso}/{id}/editar`) and asserting that it loads a page with pre-populated data,
* opening the delete confirmation modal and effectively deleting the record, as it only uses records previously created by this test suite.

**Role-based access for the Salesman user**

| Spec | Focus |
|------|-------|
| `roles/salesman.spec.js` | The `Salesman` role's UI access and restrictions |

This test spec logs in as the `Salesman` account (not the shared admin session, via
`test.use({ storageState: ... })`) and assesses that this user can effectively access the *Clientes*,
*Artículos*, and *Facturas de Venta*, but it's blocked to accessing the **Cobranzas** area.

## Setup required

```bash
cd e2e-api-bdd-tests/
npm install
npx playwright install chromium firefox webkit
```

Credentials and configuration are read from the `secrets/.env.development` file, which are listed as follows (replace the asterisks with real values for your setting):

```
BASE_URL='https://***********'
ADMIN_USER=********@********.***
ADMIN_PASS=********
SALESMAN_USER=********@********.***
SALESMAN_PASS=********
```

`secrets/global-setup.js` logs in once and stores the session in `.secrets/user.json`,
so every Playwright test spec starts authenticated.

## Write guard and data lifecycle (hooks)

These tests run against a live ERP, but they only manage and delete records that are previously created using data submitted exclusively by these tests, a normal run will never impact on any real data.

- **Create** tests filling the data, and then validates the response from the server after submitting the data.
- **Modify** tests opening the edit form and asserts that it loads a form with pre-populated data.
- **Delete** tests opening the confirmation modal and clicking on **Delete** button and receiving the response from the server.

## Running the Playwright tests

```bash
npm test                                     # Runs all tests
npm run test:headed                          # Runs in headed mode
npx playwright test --grep @smoke            # Runs only smoke tests
npx playwright test --grep @regression       # Runs only regression tests
npx playwright test clients/           # Runs tests in a single feature folder
npx playwright test clients/clients-creation.spec.js # Runs a single test spec file
npm run report                               # Opens the last HTML report
```

## Notes

- The ERP forms expose no `data-testid`, so selectors had to rely on element `id`s mostly, as well as some *Role* selectors for visible text.
- API-level CRUD tests live in `api/` — see `api/README.md`.
