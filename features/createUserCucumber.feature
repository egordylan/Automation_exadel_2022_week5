Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/"
    When I login into system as: "walker@jw.com", "password"
    And I wait "John Walker" for displayed

  Scenario: Create user
    When I go to the "Create User" menu item
    When I fill the form:
      """
      email: 'test@test.com'
      password: 'U&cmpYsxK9'
      Address1: 'Ravala pst 7-21'
      Address2: 'flor 3'
      City: 'Tallinn'
      Zip: 332567
      Description: 'test user'
      """
    Then Check the user: "test@test.com"

# npx wdio -f cucumber --spec features/createUserCucumber.feature