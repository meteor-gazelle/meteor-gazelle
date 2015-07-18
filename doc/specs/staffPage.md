# Staff Page

## Table of contents

1. Motivation
2. Business rules
3. Use cases
4. Data model

## Motivation

>The staff team is the core of the smooth operation of the site. The staff page is a list of the site's staff members for the user's convenience.

## Business Rules

> * User classes must have an option to be presented on the staff page.

## Use Cases

### 1.0 A user visits the staff page

**Primary Actor:** A user

**Brief:** Allows users to see the staff page.

**Preconditions:** N/A

**Trigger:** A user navigates to the staff page.

**Postconditions:** The staff page is rendered.

**Basic Flow:**

1. The user navigates to the staff page.
2. The staff page is generated, including the username hyperlink and the staff member's remark.

### 2.0 Staff member editing their remark

**Primary Actor:** A user

**Brief:** Staff members must be able to edit the remark that shows up next to their username on the staff page.

**Precondition:** The user is in a class that is displayed on the staff page.

**Trigger:** The user hits submit on their profile edit page.

**Postconditions:** The user's staff remark is updated.

**Basic Flow:**

1. The user navigates to their user edit page.
2. The user enters a new staff remark.
3. The user hits submit, and the remark is saved.

**Functional Requirements:**

* The remark must be saved to the database.

### 3.0 Adding a user class to the staff page

**Primary Actor:** A staff member

**Brief:** User classes must be able to be added and removed from the staff page.

**Precondition:** 

* The staff member has the permission to manage user classes.
* The staff member is viewing the edit page of a user class.

**Trigger:** The staff member checks the checkbox that determines if the class is displayed on the staff page.

**Postconditions:** The user class is displayed on the staff page.

**Basic Flow:**

1. The staff member checks the box to display the user class on the staff page.
2. The staff member hits save.
3. The user class and all of its users are displayed on the staff page.

**Functional Requirements:**

* The update must be saved in the database.

## Data Model

**Staff Classes:**
> * If the class is staff or not.

**Users:**
> * Staff remark.