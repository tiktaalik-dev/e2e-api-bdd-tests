Feature: Add New Outbreak Incident Report
  As a registered and in-good-standing user of the veterinary epidemiological surveillance tool
  I want to report a new infectious disease outbreak incident by placing a pin on Google Maps
  So that public health authorities and the public can track and respond to animal disease outbreaks

  Background:
    Given I am a registered user in good standing
    And I am logged into the epidemiological surveillance tool (Alerta Veterinaria)
    And I am on the "Report New Incident" page
    And the Google Maps interface is loaded along with the form fields

  Scenario: Successfully submit a complete incident report
    When I place a map pin at coordinates "7.8942° N, 72.5039° W" (Cúcuta, Colombia)
    And I enter "Cattle (Bos taurus)" as the animal species involved
    And I enter "15" as the number of affected animals
    And I enter " painful fluid-filled blisters in the mouth and on the feet, and heavy drooling" as observed symptoms
    And I enter "Suspected: Foot-and-mouth disease (FMD)" as the suspected diagnosis
    And I add "PCR test positive for FMD virus" as laboratory findings
    And I add "Chest X-rays showing pulmonary edema in 8 animals" as imaging findings
    And I click the "Submit Incident Report" button
    Then I should see a success message "Incident report submitted successfully"
    And the new incident should appear on the public world map
    And the incident should be included in the public incidents listing

  Scenario: Cannot submit report without required coordinates
    When I fail to place a map pin (leave coordinates empty)
    And I fill in all other required fields: animal species, affected count, symptoms, diagnosis
    And I click the "Submit Incident Report" button
    Then I should see an error message "Please select a location on the map"
    And the incident report is not submitted

  Scenario: Non-registered public user cannot access the add incident page
    Given I am a public user (unregistered)
    When I try to navigate to the "Report New Incident" page
    Then I am redirected to the login/register page
    And I see an error message "Only registered users in good standing can submit incident reports"
