# Tagging

## Table of Contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Tagging allows items on the site to be associated with a topic, either broad or granular. Having 
such a system in place allows users to find exactly what they're looking for with much greater
ease.

## Business rules

* Tags must come in two options:
  * Simple tagging, which allows for an unlimited number of tags.
  * Hierarchal tagging, which allows for sub-tags.
* The number of tags must have a limit that is configurable on a case-by-case basis. (i.e. a limit
  of 5 tags for a wiki article, and 2 tags for collages)
* Each system that uses the tagging packge must have the option to force tags to be chosen from
  a pre-defined set. (i.e. a forum limiting users to tags relevant to the forum)
* Each system that uses the tagging package must have tag editing permissions specific to the system.

## Use cases

### 1.0 Managing the global tag list

**Actor:** A user

**Brief:** The global tag list is used when systems don't define their own custom tag sets. This 
global list must be editable.

**Trigger:** The user makes changes to a global tag.

**Preconditions:** The user has the tag administration permission enabled.

**Postconditions:** The tag is updated.

**Basic Flow:**

1. The user makes changes to a tag.
2. The user saves the changes.

### 2.0 Adding tags with simple tagging

**Actor:** A user

**Brief:** Simple tagging is essential for things like wiki articles, collages, and requests.

**Trigger:** The user opens the tag manager for the item being created.

**Preconditions:** The user has the proper permissions enabled to create an item.

**Postcondition:** The selected tags are added to the item.

**Basic Flow:**

1. The user opens the tag manager.
2. The user selects tags up to the set limit, or as many as the user would like if no limit
   is set.
3. The user closes the tag manager, and the tags are added to the item.

**Non-Functional Requirements:**

* Tags can be edited at any point during the creation of the item.

### 2.1 Adding tags with hierarchal tagging