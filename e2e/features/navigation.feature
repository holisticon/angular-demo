Feature: Navgation
  As a user I want to navigate between the different parts of the application using a global navigation menu.

  Scenario: Navigate to catalog
    Given I am on the homepage
    When I click "Catalog"
    Then I am redirected to the search results page

  Scenario: Navigate to shopping cart
    Given I am on the homepage
    When I click "Shopping Cart"
    Then I am redirected to the shopping cart page
