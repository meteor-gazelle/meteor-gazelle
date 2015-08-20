# Wiki Specs

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

The site contains a variety of users with a vast wealth of knowledge. The wiki is a place where users can put their knowledge to work, and write articles for users to use. These may be supplementary to other documents on the site, or standalone documents such as guides.

## Business rules

* Articles must be able to be read/write locked based on user class.
* Users with the wiki administration permission must have full access to all articles.
* Article creation must be associated with a permission.
* Aliases, tags, and dedicated terms must be unique.
* Articles must have a revision history, with the ability to roll back to a previous revision by a user
  with the wiki administration permission.
* Articles must be able to be commented on, and it must be associated with a permission.

## Use cases

### 1.0 Creating an article

**Primary Actor:** A user

**Brief:** Users must be able to create wiki articles in order to share knowledge with other users.

**Preconditions:** The user must have the wiki creation permission, the wiki management permission, or the wiki administration permission enabled.

**Trigger:** The user chooses to create an article.

**Postconditions:**

* The article is created

**Basic Flow:**

1. The user navigates to the wiki and chooses to create an article.
2. The template is generated, containing a title and section textarea, as well as ways to add other sections/sub-sections.
3. The user fills out the template and user class read/edit restrictions, and submits the article.

**Non-Functional Requirements**

* Each template section must have a method to add another section.
* Each template section must have a method to add a sub-section.

**Functional Requirements**

* BBCode/Markdown that changes the font size must be removed from the article text upon submission.

**Miscellaneous:**

* A "section" is a section of a wiki article, used for organizing info and generating the table of contents.
* The template, by default, renders a single section for the user to fill out, with the option to add more sections and sub-sections.

### 2.0 Viewing an article

**Primary Actor:** A user

**Brief:** Wiki articles must be able to be viewed.

**Preconditions:** The user has the appropriate user class to read the article, or has the wiki administration permission.

**Trigger:** The user navigates to the article's URL.

**Postcondition:** N/A

**Basic Flow:**

1. The user navigates to the URL of the article.
2. The article is rendered.

**Non-Functional Requirements:**

* The table of contents must be auto-generated from the sections and sub-sections.
* The tags, aliases, and dedicated words must be presented in a user-friendly manner.

### 3.0 Editing an article

**Primary Actor:** A user

**Brief:** Editing articles allows mistakes and misinformation to be corrected, and current information to be expanded upon.

**Preconditions:** The user has the appropriate user class to edit the article and has the wiki management permission enabled, or has the wiki administration permission enabled.

**Trigger:** The user selects to edit the article.

**Postcondition:**

* The edits to the article are saved.

**Basic Flow:**

1. The user selects to edit the article, and makes the desired changes.
2. The user submits the changes.
3. The changes are saved to the database, and the user is redirected to the updated article.

**Functional Requirements:**

* The article's revision history must be updated with the changes.
* The article editing template must be the same as the article creation template, except with all of the fields filled in.
* The title and body fields must be editable by the user.

### 3.1 Deleting an article

**Primary Actor:** A user

**Brief:** Just as articles can be edited, they must also be deleted.

**Preconditions:**

* The user is viewing the article.
* The user has the appropriate user class to edit the article and has the wiki management permission enabled, or has the wiki administration permission enabled.

**Trigger:** The user performs the article deletion action.

**Postcondition:**

* The article is deleted.

**Basic Flow:**

1. The user performs the article deletion action.
2. The user is presented with a deletion confirmation.
3. The user clicks yes, and the article is deleted.

### 4.0 Managing aliases

**Primary Actor:** A user

**Brief:** Aliases allow search terms to map to others, making searching easier.

**Precondition:** The user has the wiki management permission or the wiki administration permission enabled.

**Trigger:** The user adds or removes an alias.

**Postconditions:** N/A

**Basic Flow:**

1. The user adds or removes a search alias.
2. The changes are saved.

**Applicable business rules:**

* Aliases must be unique.

### 5.0 Users must be able to search the wiki

**Primary Actor:** A user

**Brief:** The wiki must be able to be searched in order to find articles.

**Precondition:** N/A

**Trigger:** The user enters a search query.

**Postcondition:** The found article is returned, or a list is returned.

**Basic Flow:**

1. The user enters a search query.
2. First, dedicated terms are checked. If a dedicated term is found, the article is automatically returned.
3. Second, aliases are checked. If an alias matches a dedicated term, it is returned.
  3a. If the alias matches a tag, both the original search term and the alias are checked in the next step.
4. Third, tags are checked. Both the alias and original search term are checked for matching tags.
  4a. If a single result is found, it is returned. If multiple are found, they are returned and presented to the user.

**Functional Requirements:**

* Only articles the user can view must be returned.

### 6.0 Tagging articles

**Primary Actor:** A user

**Brief:** Similar to the aliasing system, tagging allows users to search for articles on a broader topic.

**Precondition:** The user has the appropriate user class to edit the article, or has the wiki administration permission enabled.

**Trigger:** The user saves a tag on an article.

**Postcondition:** The tag is saved.

**Basic Flow:**

1. The user types in the tag to add.
2. The user hits submit, and the tag is saved.

**Functional Requirements:**

* Duplicate or blank tags must be ignored.
* A new revision must be created when a tag is added.

### 6.1 Removing article tags

**Primary Actor:** A user

**Brief:** Tags must be able to be removed for accuracy.

**Precondition:** The user has the appropriate user class to edit the article and has the wiki management permission enabled, or has the wiki administration permission enabled.

**Trigger:** The user clicks the X button next to a tag.

**Postcondition:** The tag is removed.

**Basic Flow:**

1. The user clicks the X button next to a tag.
2. The tag is deleted.

**Functional Requirements:**

* A new revision must be created when a tag is removed.

### 7.0 Managing an article's dedicated terms

**Primary Actor:** A user

**Brief:** Dedicated terms allow common searches to resolve to the correct article.

**Precondition:** The user has the appropriate class to edit the article and has the wiki management permission enabled, or has the wiki administration permission enabled.

**Trigger:** The user adds or removes a dedicated term from an article.

**Postcondition:**  N/A

**Basic Flow:**

1. The user adds or removes a dedicated term from an article.
2. The update is saved.

**Applicable business rules:**

* Dedicated terms must be unique across all articles.
