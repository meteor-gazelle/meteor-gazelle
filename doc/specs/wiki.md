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
> * Users with the wiki management permission must have full access to all articles.
> * Article creation must be associated with a permission.

## Use cases

### 1.0 Creating an article

**Primary Actor:** A user

**Brief:** Users must be able to create wiki articles in order to share knowledge with other users.

**Preconditions:** The user must have the wiki creation permission or the wiki management permission enabled.

**Trigger:** When the user clicks the link to create an article.

**Postconditions:**

* The article is created

**Basic Flow:**

1. The user clicks the link to create an article.
2. The template is generated, containing a title and section textarea.
3. The user fills out the fields and user class read/edit restrictions, and hits submit.

**Non-Functional Requirements**

* BBCode must be stored in the database and rendered at page load
* Each section must have a [+] button to add another section.
* Each section must have a [++] button to add a sub-section.

### 2.0 Viewing an article

**Primary Actor:** A user

**Brief:** Wiki articles must be able to be viewed.

**Preconditions:** The user has the appropriate user class to read the article, or has the wiki management permission enabled.

**Trigger:** The user navigates to the article's URL.

**Postcondition:**

* The article is rendered.

**Basic Flow:**

1. The user navigates to the URL of the article.
2. The article is rendered.

**Non-Functional Requirements:**

* The table of contents must be auto-generated from the sections and sub-sections.
* The tags, aliases, and dedicated words must be presented in a user-friendly manner.

### 3.0 Editing an article

**Primary Actor:** A user

**Brief:** Editing articles allows mistakes and misinformation to be corrected, and current information to be expanded upon.

**Preconditions:** The user has the appropriate user class to edit the article, or has the wiki management permission enabled.

**Trigger:** The user clicks the edit link on the article's page.

**Postcondition:**

* The edits to the article are saved.

**Basic Flow:**

1. The user clicks the edit link on the article's page.
2. The user clicks submit.
3. The changes are saved to the database, and the user is redirected to the updated article.

**Functional Requirements:**

* The article's revision history must be updated with the changes.

**Non-Functional Requirements:**

* The article editing template must be the same as the article creation template, except with all of the fields filled in.

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

### 4.0 Adding aliases

**Primary Actor:** A user

**Brief:** Alises allow wiki articles to be easily searched. Managing aliases ensures they are accurate and thorough.

**Preconditions:**

* The user is currently viewing the article.
* The user has the appropriate user class to edit the article.

**Trigger:** The user clicks the submit button next to the alias textbox.

**Postcondition:**

* The alias is added to the article.

**Basic Flow:**

1. The user enters the new alias into the textbox.
2. The user hits submit, and the alias is added to the article.

**Functional Requirements:**

* When the user hits submit, the system must ensure that the alias isn't a duplicate, and that it is not empty.
* New aliases are committed to the database.

### 4.1 Removing aliases

**Primary Actor:** A user

**Brief:** Aliases must be able to ensure relevancy and accuracy.

**Preconditions:**

* The user is currently viewing the article.
* The user has the appropriate user class to edit the article.

**Trigger:** The user clicks the X button next to an alias.

**Postcondition:**

* The alias is removed.

**Basic Flow:**

1. The user clicks the X button next to an alias.
2. The alias is removed.

**Functional Requirements:**

* The alias must be removed from the database.

### 4.2 A user can view the article's aliases

**Primary Actor:** A user

**Brief:** Users must be able to view the article's aliases.

**Preconditions:** N/A

**Trigger:** The user navigates to the article's page.

**Postconditions:** The aliases are rendered with the appropriate buttons.

**Basic Flow:**

1. The user navigates to the article's page.
2. The aliases are rendered.
  2a. If the user is able to edit an article, the X button must be rendered next to each alias to delete the alias, and the U button must be rendered to view the user that added the alias.

### 5.0 Wiki search with dedicated term

**Primary Actor:** A user

**Brief:** Setting dedicated search words will make finding the desired article easier and faster.

**Preconditions:** N/A

**Trigger:** The user searches for a dedicated term.

**Postconditions:** The article matching the dedicated term is found.

**Basic Flow:**

1. The user enters a search query.
2. The database is searched for a single article with the unique dedicated term.
3. The user is redirected to the found article.

**Functional Requirements:**

* Dedicated terms must be unique.

### 5.1 Wiki search with aliases

**Primary Actor:** A user

**Brief:** Searching wiki aliases is essential to finding articles faster.

**Preconditions:** The alias radio button is selected on the search page.

**Trigger:** A user enters a search query, and hits enter.

**Postconditions:** The article is displayed, or a list if multiple are found.

**Basic Flow:**

1. The user types in a query, and hits enter.
2. The found article is rendered.

**Alternate Flow:**

If multiple results are found:

1. The user types in a query, and hits enter.
2. A paginated list of results is printed, including the title, last updated date, and the user that last edited the article.

**Functional Requirements:**

* The search query must be broken into individual words. Each wiki article title and alias must be searched for a matching word. If a match word is found, the article is returned.

### 5.2 Wiki search with tags

**Primary Actor:** A user

**Brief:** Searching with tags allows users to find articles on a broader topic.

**Precondition:** The tags radio button is selected on the search page.

**Trigger:** The user types in a query and hits enter.

**Postcondition:** A paginated list of results is rendered.

**Basic Flow:**

1. The user types in a query, and hits enter.
2. A paginated list of articles is printed, including the title, last updated date, and the user that last edited the article.

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

**Precondition:** The user has the wiki comment permission or the wiki management permission enabled.

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

**Precondition:** The user has the wiki management permission enabled, or is the author of the comment.

**Trigger:** The user clicks the edit button above a comment.

**Postcondition:** The edited comment is saved.

**Basic Flow:**

1. The user clicks the edit button above a wiki comment.
2. The user edits the comment.
3. The user clicks save, and the changes are saved to the database.

**Functional Requirements:**

* When the change is saved, the document must be updated with the user ID that edited the comment, and the timestamp of the edit time.

### 6.3 Deleting Wiki Comments

**Primary Actor:** Wiki manager

**Brief:** Sometimes wiki comments need to be deleted.

**Precondition:** N/A

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

**Precondition:** The user has the appropriate user class to edit the article, or has the wiki management permission enabled.

**Trigger:** The user saves a tag on an article.

**Postcondition:** The tag is saved.

**Basic Flow:**

1. The user types in the tag to add.
2. The user hits submit, and the tag is saved.

**Functional Requirements:**

* Duplicate or blank tags must be ignored.

### 7.1 Removing article tags

**Primary Actor:** A user

**Brief:** Tags must be able to be removed for accuracy.

**Precondition:** The user has the appropriate user class to edit the article, or has the wiki management permission enabled.

**Trigger:** The user clicks the X button next to a tag.

**Postcondition:** The tag is removed.

**Basic Flow:**

1. The user clicks the X button next to a tag.
2. The tag is deleted.

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
* An aliases subdocument, containing:
  * The title of the alias.
  * The ID of the user that added the alias.
  * The timestamp of when the alias was added.
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