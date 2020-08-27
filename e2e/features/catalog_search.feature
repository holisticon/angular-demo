Feature: Catalog Search
  As a user I want to search the catalog for products to order.

  Scenario: Search for pizza
    Given I am on the homepage
    When I enter "pizza" in the "Search Catalog..." field
    And I click "Search Products"
    Then I am redirected to a page with search results
    And I get 3 search results
    And all search results contain "pizza"

  Scenario: Search for all products
    Given I am on the homepage
    When I leave the "Search Catalog..." field empty
    And I click "Search Products"
    Then I am redirected to a page with search results
    And the search results contain all products
