Feature: Unsuccessful login

  Scenario: Unsuccessful login with invalid credentials
    When I go to "https://viktor-silakov.github.io/course-sut/?quick"
    And I input credentials:
      | login             | password      | message               |
      | walker@jw.com     | password1     | Fail to login         |
      | password          | walker@jw.com | Fail to login         | 
      | admin             | admin         | Fail to login         | 
      | user              | 123           | Fail to login         | 
      | dlink             | dlink         | Fail to login         | 
    Then "Fail to login" message appears

  Scenario: Unsuccessful login with empty password
    When I go to "https://viktor-silakov.github.io/course-sut/?quick"
    And I input credentials:
      | login             | password      | message               |
      | walker@jw.com     |               | Password is empty     | 
      | user              |               | Password is empty     | 
      | admin             |               | Password is empty     | 
    Then "Password is empty" message appears

  Scenario: Unsuccessful login with empty login
    When I go to "https://viktor-silakov.github.io/course-sut/?quick"
    And I input credentials:
      | login             | password      | message               |
      |                   | password      | Login is empty        | 
      |                   |               | Login is empty        | 
    Then "Login is empty" message appears

  Scenario: Unsuccessful login for suspended user
    When I go to "https://viktor-silakov.github.io/course-sut/?quick"
    And I input credentials:
      | login             | password  |
      | old_walker@jw.com | password1 |
    Then "The user is suspended" message appears

# npx wdio -f cucumber --spec features/unsuccessfulLogin-homework1-4_scenario.feature
