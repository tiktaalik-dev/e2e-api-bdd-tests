# Set of tests to call the Restful API using Bruno's CLI tool

## Bruno CLI

The tests on the `tests` folder are meant to be run using the Bruno CLI tool in a terminal (e.g. in your favourite IDE).

The final reports where all tests passed were ran using the following commands:

1. Listing all products, creating a new product, and listing the new product:

```bash
bru run --env-file environments/testing.json --reporter-html reports/results-creation.html --json-file-path data/product-valid_data.json tests/login.yml tests/list_all_products.yml tests/create_product.yml tests/list_created_product.yml
```

2. Updating the name of the product, listing the updated product, and deleting the product:

```bash
bru run --env-file environments/testing.json --reporter-html reports/results-updating.html --json-file-path data/product-valid_update_data.json tests/login.yml tests/update_product.yml tests/check_product_update.yml tests/delete_product.yml
```

3. Attempting to create a new product with invalid data:

```bash
bru run --env-file environments/testing.json --reporter-html reports/results-invalid-creation.html --json-file-path data/product-invalid_data.json tests/login.yml tests/create_invalid_product.yml
```
