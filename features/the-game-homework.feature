Feature: The game

    Scenario: Play the game and get more than 100 points
        When I go to "https://viktor-silakov.github.io/course-sut/arkanoid.html"
        Then Play game untill score is more than "100"


# npx wdio -f cucumber --spec features/the-game-homework.feature