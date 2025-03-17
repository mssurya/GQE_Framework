Feature: API Call Tests

  Scenario: Get specific user
    Given I have a request context
    When I send a request to get a specific user with gender "male" and status "active"
    Then the response status code should be 200
    And the response should be OK
    And print the response details

  Scenario: Get all users
    Given I have a request context
    When I send a request to get all users
    Then the response status code should be 200
    And the response should be OK
    And print the response details

  Scenario: Dispose the response after getting the response of Users
    Given a request to the users endpoint
    When the response is received
    Then the response status code should be 200
    And the response should be OK
    Then the response body is disposed

  Scenario: Dispose the response after getting the response of Specific Users
    Given a request to the specific user endpoint
    When the second response is received
    Then the specific user response body is also disposed

  # Scenario: Get users
  #   Given I have a request context
  #   When I send a request to get users
  #   Then the response status code should be 200
  #   And the response should be OK
  #   And the response body should contain expected parameters
  #   And the response headers should contain expected parameters

  # Scenario: Get users with token
  #   Given I have a request context with token
  #   When I send a request to get users with token
  #   Then the response status code should be 200
  #   And the response should be OK
  #   And the response body should contain expected parameters
  #   And the response headers should contain expected parameters  