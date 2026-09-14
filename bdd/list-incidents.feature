Feature: List and Filter Public Incident Reports
  I am an user of the veterinary epidemiological surveillance tool and
  I want to view, filter, sort, and export incident reports from the global listing
  So that I can analyze and track infectious disease outbreaks affecting animals worldwide

  Background:
    Given there are existing incident reports in the system:
      | Incident ID | Location               | Date       | Disease               | Species | Affected |
      | INC-001     | Corral, Los Rios, Chile| 2026-09-07 | Avian influenza       | Poultry | 26      |
      | INC-002     | Shan State, Myanmar    | 2023-08-27 | African swine fever   | Pigs    | 28       |
      | INC-003     | Cúcuta, Colombia       | 2017-07-19 | Foot-and-mouth disease| Cattle  | 15       |
    And I am on the "Incidents Listing" page (publicly accessible)

  Scenario: View all incidents in the default listing
    When I load the incidents listing page
    Then I should see all 3 incident reports in the list
    And each incident displays key details: location, date, disease, species, number of affected animals

  Scenario: Filter incidents by country (geographical location)
    When I select "Chile" from the country filter dropdown
    Then I should only see one incident report in the list: INC-001
    And I do not see the Myanmar incident (INC-002)

  Scenario: Sort incidents by outbreak size (descending)
    When I select "Sort by: Outbreak size (largest first)"
    Then the incidents are ordered as: INC-002 (28), INC-001 (26), INC-003 (15)

  Scenario: Filter incidents by disease type
    When I select "Foot-and-mouth disease" from the disease filter
    Then I should see only 1 incident report in the list: INC-003

  Scenario: Export a single incident report as JSON
    When I click the "Export as JSON" button for incident INC-003
    Then a JSON file is downloaded to my device
    And the JSON file contains all details of the Cúcuta FMD outbreak in cattle

  Scenario: Bulk export all filtered incidents as JSON
    When I filter the list to show only incidents between 2020 and 2026 (INC-001, INC-002)
    And I click the "Export listed incidents as JSON" button
    Then a single JSON file is downloaded containing both incident reports
    And the JSON array includes exactly 2 incident objects
