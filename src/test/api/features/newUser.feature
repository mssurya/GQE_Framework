Feature: Create a new user

  Scenario: Create a user with name and job
    Given I have the user details
    When I send a POST request to create the user
    Then the user should be created successfully