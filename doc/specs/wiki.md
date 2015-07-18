# Wiki Specs

## Metadata

Author: guitarman0831

### Changelog

**2015-07-18**

* Initial version

## Table of contents

1. Motivation
2. Business rules
3. Use cases
4. Data model

## Motivation

>The site contains a variety of users with a vast wealth of knowledge. The wiki is a place where users can put their knowledge to work, and write articles for users to use. These may be supplementary to other documents on the site, or standalone documents such as guides.

## Business rules

> * Articles must be able to be read/write locked based on user class.
> * Staff members must have full access to articles.
> * Article creation must be associated with a permission.

## Use cases

These use cases describe various ways the authentication system will interact.

**Use cases:**

### 1.0 Creating an article

**Primary Actor:** A user

**Brief:** Users must be able to create wiki articles in order to share knowledge with other users.

**Preconditions:** The user has the proper permission to create a wiki article.

**Trigger:** When the user clicks the link to create an article.

**Postconditions:**

* The article is created

**Basic Flow:**

1. The user clicks the link to create an article.
2. The user fills out the title and body of the new article.
3. The user chooses the user class read and edit restrictions.
4. The user clicks submit, and is redirected to the new article.

**Functional Requirements**

* BBCode should be stored in the database and rendered at page load

### 2.0 Viewing an article

**Primary Actor:** A user

**Brief:** Wiki articles must be able to be viewed.

**Preconditions:** The user has the appropriate user class to read the article.

**Trigger:** The user navigates to the article's URL.

**Postcondition:**

* The article is rendered.

**Basic Flow:**

1. The user navigates to the URL of the article.
2. The article is rendered.

**Functional Requirements:**

* BBCode must be rendered when the article is loaded from the database.
* The table of contents must be generated based on the pre-defined BBCode header tags.

### 3.0 Editing an article

**Primary Actor:** A user

**Brief:** Editing articles allows mistakes and misinformation to be corrected, and current information to be expanded upon.

**Preconditions:** The user has the appropriate user class to edit the article.

**Trigger:** The user clicks the edit link on the article's page.

**Postcondition:**

* The edits to the article are saved.

**Basic Flow:**

1. The user clicks the edit link on the article's page.
2. The user makes the appropriate changes to the title, body, and user class read/edit restrictions.
3. The user clicks submit.
4. The changes are saved to the database, and the user is redirected to the updated article.

**Functional Requirements:**

* The article's revision history must be updated with the changes.

### 3.1 Previewing articles

**Primary Actor:** A user

**Brief:** When editing an article, previewing ensures that the formatting is correct.

**Preconditions:** The user is creating an article, or is on the edit page of an article.

**Trigger:** The user clicks the preview button.

**Postcondition:**

* The article is rendered in-place, without committing anything to the database.

**Basic Flow:**

1. The user is making changes to an article, or writing a new one.
2. The preview button is clicked.
3. The article is rendered in-place, and is presented to the user.

**Functional Requirements:**

* BBCode must be rendered when the article is previewed.

### 4.0 Adding aliases

**Primary Actor:** A user

**Brief:** Alises allow wiki articles to be easily searched. Managing aliases ensures they are accurate and thorough.

**Preconditions:** The user is currently viewing the article.

**Trigger:** The user clicks the submit button next to the alias textbox.

**Postcondition:**

* The alias is added to the article.

**Basic Flow:**

1. The user enters the new alias into the textbox.
2. The user hits submit, and the alias is added to the article.

**Functional Requirements:**

* Duplicate and null aliases must be able to be detected, and discarded.
* New aliases are committed to the database.

### 4.1 Removing aliases

**Primary Actor:** A user

**Brief:** Aliases must be able to ensure relevancy and accuracy.

**Preconditions:** The user is currently viewing the article.

**Trigger:** The user clicks the X button next to an alias.

**Postcondition:**

* The alias is removed.

**Basic Flow:**

1. The user clicks the X button next to an alias.
2. The alias is removed.

**Functional Requirements:**

* The alias must be removed from the database.

### 4.2 Viewing a user that added an alias

**Primary Actor:** A user

**Brief:** Users must be able to view which user added an alias.

**Preconditions:** N/A

**Trigger:** The user clicks the U button next to an alias.

**Postconditions:** The user is redirected to the user that added the alias.

**Basic Flow:**

1. The user clicks the U button next to an alias.
2. The user is redirected to the user that added the alias.

## Data model

What data should be tracked.

**Wiki Articles:**
> * The title of the article.
> * The body of the article, containing the BBCode tags.
> * The current revision number.
> * The ID of the user that created the article.
> * The timestamp of the article creation time.
> * The timestamp of the last edit time.

**Wiki Revisions:**
> * The ID of the corresponding wiki article.
> * The revision number.
> * The revision title.
> * The revision body.
> * The timestamp of the revision date.
> * The ID of the user that authored the revision.

**Wiki Aliases:**
> * The ID of the corresponding wiki article.
> * The title of the alias.
> * The ID of the user that added the alias.
> * The timestamp of when the alias was added.