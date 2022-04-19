Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/"
    When I login into system as: "walker@jw.com", "password"
    And I wait "John Walker" for displayed

  Scenario: Create user
    When I go to the "Create User" menu item
    And I fill the user form:
      """
      email: 'test@test.com'
      password: 'U&cmpYsxK9'
      address1: 'Ravala pst 7-21'
      address2: 'flor 3'
      city: 'Tallinn'
      zip: 332567
      description: 'test user'
      """
    Then Check the user data

# npx wdio -f cucumber --spec features/createUser-homework-with-world.feature