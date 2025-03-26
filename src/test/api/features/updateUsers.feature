Feature: Update User PUT Call With POJO Lombok Test

  Background:
    Given a new API request context is created

  Scenario: Create a new user, update the user, and verify the update
    When I create a new user with random email using builder pattern
    Then the response status should be 201
    And the response status text should be "Created"
    And the JSON response should contain the user ID
    When I update the user status to inactive and name to "Inactive_User"
    Then the update response status should be 200
    When I fetch the updated user by ID
    Then the response status should be 200
    And the response status text should be "OK"
    And the response should contain the updated user details