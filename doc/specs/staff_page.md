# Staff Page

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

>The staff team is the core of the smooth operation of the site. The staff page is a list of the site's staff members for the user's convenience.

## Business Rules

> * User classes must have an option to be presented on the staff page.
> * Users with the class management permission must be able to toggle if a user class is displayed on the staff page.
> * User classes with dedicated staff page descriptions must get their own sections on the staff page (i.e. forum moderators).

## Use Cases

### 1.0 A user visits the staff page

**Primary Actor:** A user

**Brief:** Allows users to see the staff page.

**Preconditions:** N/A

**Trigger:** A user navigates to the staff page.

**Postconditions:** The staff page is rendered.

**Basic Flow:**

1. The user navigates to the staff page.
2. The staff page is generated, including the username hyperlink and the user's staff page description.
### 2.0 User editing their staff page description

**Primary Actor:** A user that belongs to a user class that is displayed on the staff page.

**Brief:** Staff members must be able to edit the staff page description that shows up next to their username on the staff page.

**Precondition:** The user is in a class that is displayed on the staff page.

**Trigger:** The user clicks submit on their profile edit page.

**Postconditions:** The user's staff page description is updated.

**Basic Flow:**

1. The user navigates to their user edit page.
2. The user enters a new staff page description.
3. The user clicks submit, and the staff page description is saved.

**Functional Requirements:**

* The staff page description must be saved to the database.

### 3.0 Adding a user class to the staff page

**Primary Actor:** A user with the class management permission

**Brief:** User classes must be able to be added and removed from the staff page.

**Precondition:** 

* The user has the class management permission.
* The user is viewing the edit page of a user class.

**Trigger:** The user checks the checkbox that determines if the class is displayed on the staff page.

**Postconditions:** The user class is displayed on the staff page.

**Basic Flow:**

1. The user checks the box to display the user class on the staff page.
2. The user clicks save.
3. The user class and all of its users are displayed on the staff page.

**Functional Requirements:**

* The update must be saved to the database.

### 3.1 Removing a user class from the staff page

**Primary Actor:** A user with the class management permission

**Brief:** User classes must be able to be removed from the staff page.

**Precondition:**

* The user has the class management permission.
* The user is viewing the edit page of a user class.

**Trigger:** The user unchecks the checkbox that determines if the class is displayed on the staff page.

**Postconditions:** The user class is removed from the staff page.

**Basic Flow:**

1. The user unchecks the box to display the user class on the staff page.
2. The user clicks save.
3. The user class is removed from the staff page.

**Functional Requirements:**

* The update must be saved to the database.

### 4.0 Adding a staff page description to a user class

**Primary Actor:** A user with the class management permission

**Brief:** Adding a staff page description to a user class causes the class to get its own section on the staff page.

**Precondition:**

* The user has the class management permission.
* The user is viewing the edit page of a user class.

**Trigger:** The user fills out the staff page description textarea.

**Postconditions:** The user class gets its own section on the staff page.

**Basic Flow:**

1. The user fills out the staff page description textarea.
2. The user clicks save.

**Non-Functional Requirements:**

* When rendering the staff page, if a user class is found with a staff page description, it must be rendered in its own section.

### 4.1 Removing a staff page description from a user class

**Primary Actor:** A user with the class management permission

**Brief:** Just as staff page descriptions can be added to user classes, they must also be able to be removed.

**Precondition:**

* The user has the class management permission.
* The user is viewing the edit page of a user class.

**Trigger:** The user clears the staff page description textarea.

**Postconditions:** The user class is combined with the primary staff user classes on the staff page.

**Basic Flow:**

1. The user clears the staff page description textarea.
2. The user clicks save.
