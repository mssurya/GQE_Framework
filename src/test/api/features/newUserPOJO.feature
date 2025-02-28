Feature: Create a new user using POJO

  Scenario: Create a user with name and job
    Given I have the new user details
    When I send a POST request to create the new user
    Then the new user should be created successfully with status 201