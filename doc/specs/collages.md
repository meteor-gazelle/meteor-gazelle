# Collages

## Table of contects

1. Motivation
1. Business rules
1. Use cases

## Motivation

The collage system is an important feature.
It provides an orthogonal way to either artist page or tagging system to organise Album, based (mostly) on Facts.

## Business rules

* Collage could regroup artists, torrents, torrents group, requests, labels
* Collage should be subscribable
* Collage system should only permit the creation of a collage if:
  * the user is allowed to create collage,
  * the collage has enough torrents (today rules fix the min. number to 3)
* Collage system should inform users that:
 * a similar collage exist : so one can contribute to rather creating a new one

## Use cases

### 0.0 Display the content of a collage

**Primary Actor:** A user

**Brief:**  The content of collage must be displayed

**Trigger:** The user navigates to a collage

**Postconditions:** The content of collage is displayed

### 1.0 Search collage

**Primary Actor:** A user

**Brief:** The user is able to search collage.

**Triger:** When the user inputs into the unified search box or the refined search box or a dedicated page.

**Postconditions:** A table containing the results of the search is displayed


### 2.0 Create an empty Collage

**Primary Actor:** An user that receive the possibility to create collage

**Brief:**  The user is able to create a new collage

**Trigger:** The user clicks on new collage button and fill the form

**Postconditions:** A page displaying the new empty collage that must be filled with min 3 contents to become public

**Basic Flow:**

1. TBD

### 3.0 Add a content to one collage

**Primary Actor:** An user that receive the possibility to modify the content of a collage

**Brief:**  The user is able to create add content to the collage

**Trigger:** The user click on adding a content and fill a form that link to the content

**Postconditions:** The content is added to the collage

**Basic Flow:**

1. TBD

### 3.1 Remove an album to one collage

**Primary Actor:** An user that receive the possibility to modify the content of a collage

**Brief:** The user is able to create remove content to the collage

**Trigger:** The user navigates to management pages and click on remove

**Postconditions:** The content is removed

**Basic Flow:**

1. TBD

### 3.2 Modify the title of one collage

**Primary Actor:**
* A moderator
* The creator of the collage

**Brief:**  TBD

**Trigger:** TBD

**Postconditions:** TBD

**Basic Flow:**

1. TBD


### 4 Subscribe to a collage

**Primary Actor:** An user

**Brief:** The user is able to subscribe to a collage

**Trigger:** TBD

**Postconditions:** TBD

**Basic Flow:**

1. TBD

### 5 Bookmark to a collage

**Primary Actor:** An user

**Brief:** The user is able to bookmark a collage

**Trigger:** TBD

**Postconditions:** TBD

**Basic Flow:**

1. TBD

### 6 Comment to a collage

**Primary Actor:** An user

**Brief:**  The user is able comment a collage

**Trigger:** TBD

**Postconditions:** TBD

**Basic Flow:**

1. TBD
