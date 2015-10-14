# Bookmarks

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Bookmarking site items is a way for users to save items for later use, being able to attach notes 
to each invidual bookmark for more information later on.

## Business rules

* Users must be able to bookmark any item on the site.

## Use cases

### 1.0 Viewing bookmarked items

**Primary Actor:** A user

**Brief:** Users must be able to view their bookmarked items.

**Trigger:** The user navigates to the bookmarks page.

**Basic Flow:**

1. The user navigates to the bookmarks page, and the bookmarks are displayed.

**Functional Requirements:**

* The user must have a method to filter the view based on item type.

### 2.0 Bookmarking an item

**Primary Actor:** A user

**Brief:** Bookmarking an item allows a user to save the item for later use.

**Trigger:** The user selects to bookmark an item.

**Postconditions:** The item is bookmarked.

**Basic Flow:**

1. The user selects to bookmark an item.

**Applicable Business Rules:**

* Users must be able to bookmark any item on the site.

### 3.0 Editing a note on a bookmark

**Primary Actor:** A user

**Brief:** Notes allow users to save information related to their bookmarks.

**Precondition:** The user has at least 1 bookmarked item.

**Trigger:** The user selects to add/edit notes on an item.

**Postcondition:** The notes are updated.

**Basic Flow:**

1. The user navigates to the bookmarks page.
2. The user selects to add/edit notes on an item.
3. The user makes their changes and saves.
