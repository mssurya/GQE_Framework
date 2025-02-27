Feature: Create User Post Call Test

  Background:
    Given a new API request context is created

  Scenario: Create a new user and fetch the user by ID
    When I create a new user with random email
    Then the response status should be 201
    And the response status text should be "Created"
    And the response should contain the user ID
    And the response should contain the user name "PlayWrightDemo"
    And the response should contain the user email
    When I fetch the user by ID
    Then the response status should be 200
    And the response status text should be "OK"
    And the response should contain the user ID
    And the response should contain the user name "PlayWrightDemo"
    And the response should contain the user email

  Scenario: Create a new user with Pojo and verify the response
    When I create a new user using POJO with random email
    Then the response status should be 201
    And the response status text should be "Created"
    And the response should contain the user details 

Scenario: Create a new user using Pojo Lombok and verify the response
    When I create a new user with random email using builder pattern
    Then the response status should be 201
    And the response status text should be "Created"
    And the response should contain the user details

Scenario: Create a new user with JSON and verify the response
    When I create a new user with JSON string
    Then the response status should be 201
    And the response status text should be "Created"
    And the response should contain the user ID
    And the response should contain the user name "testingAPI"
    When I fetch the user by ID
    Then the response status should be 200
    And the response status text should be "OK"
    And the response should contain the user ID
    And the response should contain the user name "testingAPI"    