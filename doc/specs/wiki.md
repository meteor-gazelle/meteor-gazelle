# Wiki Specs

## Table of contents

1. Motivation
2. Business rules
3. Use cases
4. Data model

## Motivation

>The site contains a variety of users with a vast wealth of knowledge. The wiki is a place where users can put their knowledge to work, and write articles for users to use. These may be supplementary to other documents on the site, or standalone documents such as guides.

## Business rules

> * Articles must be able to be read/write locked based on user class.
> * Users with the wiki administration permission must have full access to all articles.
> * Article creation must be associated with a permission.
> * Duplicate aliases, tags, and dedicated terms must be unique and not empty.

## Use cases

### 1.0 Creating an article

**Primary Actor:** A user

**Brief:** Users must be able to create wiki articles in order to share knowledge with other users.

**Preconditions:** The user must have the wiki creation permission, the wiki management permission, or the wiki administration permission enabled.

**Trigger:** When the user clicks the link to create an article.

**Postconditions:**

* The article is created

**Basic Flow:**

1. The user clicks the link to create an article.
2. The template is generated, containing a title and section textarea.
3. The user fills out the fields and user class read/edit restrictions, and submits the article.

**Non-Functional Requirements**

* Each section must have a method to add another section.
* Each section must have a method to add a sub-section.

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

### 6.0 Article comments

**Primary Actor:** A user

**Brief:** Sometimes, articles are out of date or have broken images. Having a comments/discussion section can help editors fix things that are incorrect and add new information.

**Precondition:** The user is viewing an article.

**Trigger:** The user clicks the comments link on an article's page.

**Postconditions:** The comments are rendered.

**Basic Flow:**

1. The user clicks the comments link on an article's page.
2. The comments are rendered.

### 6.1 Adding a comment to an article

**Primary Actor:** A user

**Brief:** Comments must be able to be added to articles.

**Precondition:**

* The user has the appropriate user class to view the article and has the wiki comment permission or the wiki management permission enabled, or has the wiki administration permission enabled.

**Trigger:** The user clicks submit on the comment page.

**Postcondition:** The comment is posted.

**Basic Flow:**

1. The user navigates to the comments page for an article.
2. The user types in their comment and hits submit.
3. The page is refreshed, displaying the newly added comment.

**Functional Requirements:**

* The comment is saved in database.

### 6.2 Editing Wiki Comments

**Primary Actor:** A user

**Brief:** Comments will sometimes be innapropriate. These comments need to be edited.

**Precondition:** The user has the wiki management permission enabled, is the author of the comment, or has the wiki administration permission enabled.

**Trigger:** The user clicks the edit button above a comment.

**Postcondition:** The edited comment is saved.

**Basic Flow:**

1. The user clicks the edit button above a wiki comment.
2. The user edits the comment.
3. The user clicks save, and the changes are saved to the database.

**Functional Requirements:**

* When the change is saved, the document must be updated with the user ID that edited the comment, and the timestamp of the edit time.

### 6.3 Deleting Wiki Comments

**Primary Actor:** A user

**Brief:** Sometimes wiki comments need to be deleted.

**Precondition:** The user has the wiki management permission or the wiki administration permission enabled.

**Trigger:** The manager clicks the delete button above a comment.

**Postcondition:** The comment is deleted.

**Basic Flow:**

1. The manager clicks the delete button above a comment.
2. The manager is prompted with a confirmation window, ensuring they actually want to delete the comment.
3. The comment is deleted if the manager clicks yes.

**Functional Requirements:**

* The corresponding comment's document must be deleted from the database.

### 7.0 Tagging articles

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

### 7.1 Removing article tags

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

### 8.0 Managing an article's dedicated terms

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

## Data model

**Wiki Articles:**
* The title of the article.
* The ID of the user that created the article.
* An array of unique dedicated terms.
* The timestamp of the article creation time.
* The timestamp of the last edit time.
* A sections subdocument, containing:
  * The title of the section.
  * The body of the section.
  * A sub-section document, containing:
    * The title of the sub-section.
    * The body of the sub-section.
* A revisions subdocument, containing:
  * The revision title.
  * The revision body.
  * The timestamp of the revision date.
  * The ID of the user that authored the revision.
* A tags subdocument, containing:
  * The tag name.
  * The ID of the user that added the tag.
  * The timestamp of when the tag was added.
* A comments subdocument, containing:
  * The ID of the user that added the comment.
  * The comment body.
  * The ID of the user that last edited the comment.
  * The timestamp of when the comment was created.
  * The timestamp of when the comment was last edited.

  **Wiki Aliases**
  * The search term.
  * The aliased term.
  * The ID of the user that added the alias.
  * The timestamp of when the alias was added.