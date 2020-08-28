Feature: Add to Shopping Cart
  As a user I want to add products to the shopping cart.

  Scenario: Add a product from the search results to the shopping cart
    Given the shopping cart is empty
    And I am on the search results page
    When I click "Add" for the first product
    Then the shopping cart contains an item with quantity 1

  Scenario: Add a product from the product details to the shopping cart
    Given the shopping cart is empty
    And I am on the product details page
    When I click "Add"
    Then the shopping cart contains an item with quantity 1

  Scenario: Add a product with quantity 2 to the shopping cart
    Given the shopping cart is empty
    And I am on the product details page
    When I enter "2" in the "Quantity" field
    And I click "Add"
    Then the shopping cart contains an item with quantity 2

  Scenario: Add a product twice to the shopping cart
    Given the shopping cart is empty
    And I am on the product details page
    When I click "Add"
    And I click "Add"
    Then the shopping cart contains an item with quantity 2
