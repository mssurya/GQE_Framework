Feature: Delete User Test

  Background:
    Given a new API request context is created

  Scenario: Create a new user, delete the user, and verify deletion
    When I create a new user with random email using builder pattern
    Then the response status should be 201
    And the JSON response should contain the user ID
    When I delete the user by ID
    Then the delete response status should be 204
    When I fetch the user by ID
    Then the response status should be 404
    And the response status text should be "Not Found"
    And the response should contain "Resource not found"
