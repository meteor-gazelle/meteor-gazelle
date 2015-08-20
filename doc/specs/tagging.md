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
  of 5 tags for a wiki article, or 2 tags for collages)
  * In the case of hierarchal tagging, the following options must be configurable:
    * Required or optional parent tags, minimum number of parent tags, or maximum number of parent tags.
    * Required or optional child tags, minimum number of child tags, or maximum number of child tags.
    * Selection of parent tags before child tags required or optional.
* Each system that uses the tagging packge must have the option to force tags to be chosen from
  a pre-defined set. (i.e. a forum limiting users to tags relevant to the forum)
* Each system that uses the tagging package must have tag editing permissions specific to the system.
* Parent and child tags must not be identical.

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

**Alternate Flow:**

This applies if there is no pre-defined tag set.

1. The user opens the tag manager.
2. The user enters tags up to the set limit, or as many as the user would like if no limit
   is set.
3. The user closes the tag manager, and the tags are added to the item.

**Non-Functional Requirements:**

* Tags can be edited at any point during the creation of the item.

### 2.1 Adding tags with hierarchal tagging

**Actor:** A user

**Brief:** Hierarchal tagging allows for more complex tagging, allowing for broader
topics and then more fine-grained topics based on the parent tag.

**Trigger:** The user opens the tag manager for the item being created.

**Preconditions:** The user has the proper permissions enabled to create an item.

**Postcondition:** The selected tags are added to the item.

**Basic Flow:**

1. The user opens the tag manager.
2. If parent tags are required to be chosen first, the list of parent tags is presented to the user, 
   and the user selects parent tags, up to the set limit, or as many as the user would like if no limit is set.
3. The user is presented with the child tag list, and selects tags up to the set limit, or as many
   as the user would like if no limit is set.
   3a. If parent tags are not required to be chosen first, the user would be presented with both
   lists at the same time.

**Non-Functional Requirements:**

* If parent tags are required to be chosen before child tags, the parent tags must be
  presented to the user first.

### 3.0 Editing tags on an item

**Actor:** A user

**Brief:** Editing tags allows for changing of incorrectly chosen or misleading tags,
or adding new ones.

**Trigger:** The user navigates to the item, and opens the tag manager.

**Preconditions:**

* The item is not tag locked, or the user has the tag administration permission
  enabled for the item group (wiki articles, collages, etc.), or the global tag administration permission enabled.
* One of the following (if the user doesn't have the tag administration permission enabled):
  * The user is the creater of the item.
  * The user has the tag management permission enabled for the item group.

**Basic Flow:**

1. The user opens the item.
2. The user chooses to edit the tags, and the tag manager is presented.
3. The user edits the tags and saves their changes.

### 4.0 Defining a tag set for an item group

**Actor:** A user

**Brief:** Defining a tag set allows the restriction of tag choices to a pre-defined list.

**Trigger:** The user opens the tag manager for the item set.

**Preconditions:** The user has the local (item set specific) or global tag administration permission enabled.

**Basic Flow:**

1. The user opens the tag manager for the item set.
2. The user makes their changes.
3. The user saves their changes.