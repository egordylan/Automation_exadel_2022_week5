Feature: The game

    Background:
        When I go to "https://viktor-silakov.github.io/course-sut/"
        When I login into system as: "walker@jw.com", "password"
        And I wait "John Walker" for displayed
    
    Scenario: Play the game and get more than 100 points
        When I go to "https://viktor-silakov.github.io/course-sut/arkanoid.html"
        Then Play game untill score is more than "100"


# npx wdio -f cucumber --spec features/the-game-homework.feature