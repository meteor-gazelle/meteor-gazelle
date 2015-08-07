# Thread Tagging

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

The forums are a major component of the site, with a vast wealth of knowledge. 
Having the ability to tag a thread would make searching much easier and more 
streamlined, and to help keep certain forums on topic.

## Business Rules

* Any thread in a tagging-enabled forum must be able to be labeled and tagged by:
  * The user creating the thread
  * A user with the tag management permission enabled
  * A user that belongs to a user class given tag editing permission on a per-forum basis
* Labels and tags must be chosen from pre-approved lists. The list will be maintained by
  users with the tag administration permission enabled.
* Each tagging enabled forum must have unique labels and tags.
* Labels are broad categories that describe a thread in general terms, and must have a
  limit of one per thread.
* A label must be selected before tags are selected.
* Tags are smaller, more granular categories that describe a thread, and must have a
  configurable limit per thread. The limit is defined in the settings file.
* Forums must be able to be configured to have tagging enabled or disabled.
* Threads must have the ability to be tag locked, preventing further tag and label
  editing.

## Use Cases

### 1.0 Viewing a tagging-enabled forum

**Primary Actor:** A user

**Brief:** When viewing the thread listing in a tagging-enabled forum, the labels and tags
must be presented in a neat and readable manner.

**Preconditions:**

* The user has permission to view the forum.

**Trigger:** The user is viewing the forum.

**Postconditions:** N/A

**Basic Flow:**

1. The user navigates to the forum.

**Non-Functional Requirements:**

* Thread labels must be visible somewhere on the forum overview.
* Thread labels must not be included in thread titles using brackets, or any other method.
* Thread tags must be visible somewhere on the forum overview, if they can be added
  in a visually appealing manner.

### 1.1 Viewing a thread in a tagging-enabled forum

**Primary Actor:** A user

**Brief:** When viewing a thread in a tagging-enabled forum, the tags and labels must be
clearly visible.

**Preconditions:**

* The user has permission to view the forum.

**Trigger:** The user opens the thread.

**Postconditions:** N/A

**Basic Flow:**

1. The user opens the thread.

**Non-Functional Requirements:**

* Thread labels and tags must be visible.

### 2.0 Creating a thread in a tagging-enabled forum

**Primary Actor:** A user

**Brief:** When a user creates a thread in a tagging-enabled forum, they must be presented
with a choice of a label and tags.

**Preconditions:** N/A

**Trigger:** When the user is creating a new thread.

**Postconditions:**

* The thread is created, with the appropriate labels and tags added to it.

**Basic Flow:**

1. The user selects to create a new thread
2. The user is presented with the thread creation template, along with an option for a label.
3. When the user selects a label, they are presented with options for tags.
4. The user submits the form, and the thread is created.

**Applicable business rules:**

* A label must be selected before tags.

### 3.0 Editing tags on a thread

**Primary Actor:** A user

**Brief:** Tagged threads must be able to be edited to ensure accuracy and relevancy.

**Preconditions:**

* One of the following three:
  * The user is the creator of the thread and the thread is not tagged locked.
  * The user has the tag management permission enabled and the thread is not tagged locked.
  * The user belongs to a user class that has been granted tag editing permission in the specified
    forum, and the thread is not tag locked.
  * The user has the tag administration permission enabled.

**Trigger:** The user chooses to edit the tags on a thread.

**Postconditions:**

* The updated labels and tags are saved.

**Basic Flow:**

1. The user selects the option to edit the thread's tags.
2. The user is presented with a tag manager and makes the desired changes.
3. The user saves the changes.

**Functional Requirements:**

* When a thread's labels/tags are modified after the thread creation, the changes must be documented
  in the thread notes section.

### 4.0 Tag locking a thread

**Primary Actor:** A user

**Brief:** Threads must be able to be thread locked to prevent any further editing.

**Preconditions:** The user has the tag administration permission enabled.

**Trigger:** The user selects the option to tag lock the thread.

**Postconditions:**

* The labels and tags on the thread can no longer be edited by anyone lacking the
  tag administration permission.

**Basic Flow:**

1. The user selects the option to tag lock the thread.
2. The thread is tag locked.

### 5.0 Searching with labels and tags

**Primary Actor:** A user

**Brief:** Being able to refine searches with labels and tags make searching the forums
much quicker and easier.

**Preconditions:** N/A

**Trigger:** The user enters a search query.

**Postconditions:** The results are displayed.

**Basic Flow:**

1. The user enters a search query.
2. The user submits the query.

**Functional Requirements:**

* The user must be able to search by labels, tags, or any combination of the two.

### 6.0 Editing a forum's unique tag and label list

**Primary Actor:** A user with the tag administration permission enabled

**Brief:** Since labels and tags can be added to threads, the list of labels and tags
must be able to be modified.

**Preconditions:** N/A

**Trigger:** The user chooses to modify a forum's labels and tags.

**Postcondition:** The labels and tags are updated.

**Basic Flow:**

1. The user selects to edit the forum's labels and tags.
2. The user makes their changes, and saves them.
