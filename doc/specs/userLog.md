# User log

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

User log is where notable events or messages are recorded. These can be:
* User actions.
* Administrator actions or messages against the user.
* System events impacting the user.

## Business Rules

* Messages in the user log are subject to visibility permissions through tagging.
  * Messages with a tag are subject to that tag's viability restrictions.
* Messages can be filtered by date, time, tag, user and message.

## Use Cases

### 1.0 Viewing the user log

#### 1.1 As a user

**Primary Actor:** A user.

**Brief:** The user log is visible to the user.

**Preconditions:**
* The user log contains messages with varying tags.

**Trigger:** User wants to see their own user log.

**Postconditions:**
* No messages outside of the user's permissions were shown.

**Basic Flow:**

1. The user navigates to their user log page.
2. The user log messages are displayed.

#### 1.2 As a user with administration permission

**Primary Actor:** A user with the user log administration permission.

**Brief:** The user log is visible to the administrator.

**Preconditions:**
* The user log contains messages with varying tags.

**Trigger:** Administrator wants to view a user's log.

**Postconditions:**
* No messages outside of the administrator's permissions were shown.

**Basic Flow:**

1. The administrator navigates to the user's log page.
2. The user log messages are displayed.

**Non-functional Requirements**
* When there are no user log messages, the log is empty.

### 2.0 Filtering the log

**Primary Actor:** A user.

**Brief:** The filtered results of the user log are filtered correctly.

**Preconditions:**
* The user log contains messages with varying tags.

**Trigger:** User wants to view messages on a specific date.

**Postconditions:**
* No messages outside of the user's permissions were shown.

**Basic Flow:**

1. The user navigates to their user log page.
2. The filter is set to the desired day.
3. Filtered messages from the log are displayed.


### 3.0 Adding messages to the log

**Primary Actor:** A user with the user log administration permission.

**Brief:** Messages can be added to the log by a user with administration permission.

**Preconditions:**
* The administrator has the required permissions to add messages to a user's log.

**Trigger:** Administrator wants to add a message into a user's log.

**Postconditions:**
* Message was persisted into the user log.

**Basic Flow:**

1. The administrator navigates to the user's log page.
2. The administrator adds a message.
3. The administrator selects a tag.
4. The message is recorded.
