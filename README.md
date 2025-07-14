Test Summary Report for Quizplus - Perks Center Suite

Supervisor:KholoudSalamh

Tester: Ibrahim Abu Hijleh

Date: June 6, 2025

Overview
Under the supervision of Eng. Kholoud Salameh, a comprehensive suite of end-to-end test cases was developed and executed for the Quizplus Perks Center using Cypress. 
The tests covered navigation, authentication, offer accessibility, and functional interaction across the platform.

Scope

1.	Main Site Accessibility - Verified that the main URL loads correctly.

2.	Perks Center Redirection - Ensured that users can navigate to the Perks Center from the homepage.
  
4.	Offer Card Navigation - Checked that clicking an offer card updates the URL (e.g., redirects to Grammarly).
   
6.	Join Us Functionality - Verified redirection to the Sign-Up page.

7.	Offer Details Flow - Tested the full flow from "View Details" -> "Get Offer" -> Sign-Up.

8.	Direct Card Offer Flow - Tested "Card Click" -> "Get Offer" -> Sign-Up flow.

9.	Login Flow - Tested Join Us -> Login -> Check if 'Join Us' disappears after login.

10.	Offer Access After Login - Verified login followed by access to offer and visibility of the PayPal button.
    
12.	Card Offer After Login - Repeated card flow but with login step to validate consistency.

13.	Full Login and Offer Flow - Validated complete process: login from homepage -> navigate to offer -> access with PayPal button visibility.
Results

All test cases passed successfully, confirming that:

-	Navigation links work as expected.

-	Authentication processes (Sign-Up/Login) function correctly.

-	Perks Center offers are accessible both before and after login.

-	Final payment options (e.g., PayPal) are visible upon successful login and offer access.

Conclusion
All scenarios have been validated and passed successfully, thanks to thorough planning and execution under the guidance of Kholoud Salameh. 
The system behaves as expected across all tested user flows 


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  Test Report: USER Profile – Education Module
  
Project: QuizPlus Web Application
Test Framework: Cypress
Environment: Staging/Testing
Executed By: Automated Test Suite
Date: July 14, 2025

🧪 Test Suite 1: USER Profile / Education
Purpose:
To validate the functionality of the Education section under User Profile, including navigation, adding, updating, and deleting education entries.


| Test Case Description                                                         | Status | Notes                                                       |
| ----------------------------------------------------------------------------- | ------ | ---------------------------------------------------------   |
| 1. Navigate to Settings → Education tab and verify the URL                    | ✅      | URL correctly navigated to `/account/about/education`.    |
| 2. Open “Add Another” education entry modal                                   | ✅      | Modal is visible and clickable.                           |
| 3. Add a new education entry and verify API payload                           | ✅      | API request (`POST`) sent successfully with correct body. |
| 4. Discard form without saving and ensure no API request is triggered         | ✅      | No request sent; discard operation worked as expected.    |
| 5. Delete the first education entry and ensure it is removed from the profile | ✅      | `DELETE` API request sent; entry no longer present.       |


Test Suite 2: Update Education using Another Account
Purpose:
To verify that another user can add and update their education entries independently, and to validate authorization consistency.

| Test Case Description                               | Status | Notes                                                              |
| --------------------------------------------------- | ------ | ----------------------------------------------------------------   |
| 1. Add education entry using a different account    | ✅      | New entry added with correct details and validated via API.      |
| 2. Update an existing education entry               | ✅      | Update reflected successfully in `GET` response.                 |
| 3. Discard update and ensure no API request is sent | ✅      | No `POST` or `PUT` request made; update was discarded correctly. |


Observations
API endpoints (POST, GET, DELETE) were successfully intercepted and validated.

The Discard functionality behaved correctly in both Add and Update scenarios.

All UI interactions (dropdowns, buttons, modals) were responsive and consistent.

No uncaught exceptions affected the tests (handled by Cypress).



 Recommendations
Ensure the dropdown search results for university/major always include the expected options.

Add more edge-case tests (e.g., duplicate entries, invalid input, empty required fields).

Introduce retry logic or loaders to handle delays when fetching dropdown suggestions.

Token values should be dynamically generated or stored securely (e.g., via environment variables).


Conclusion
All tests passed successfully. The Education module of the User Profile is functioning as expected across different user accounts and handles create, update, delete, and discard actions robustly.

                                     


