Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/"
    When I login into system as: "walker@jw.com", "password"
    And I wait "John Walker" for displayed

  Scenario: Create user
    When I go to the "Create User" menu item
    And I fill the form:
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
    And Check the address1, address2, city and zip: "Ravala pst 7-21", "flor 3", "Tallinn", "332567"
    And Check the "test user"

# npx wdio -f cucumber --spec features/createUser-homework.feature