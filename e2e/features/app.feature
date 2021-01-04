Feature: Application

  A sample Angular app

  Scenario: Home page load
    Given I navigated to the home page
    Then the page title text should be "angular-sample app is running!"
