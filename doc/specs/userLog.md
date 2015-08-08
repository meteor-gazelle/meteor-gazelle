# User log

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

User log can act as an audit trail of a user.

## Business Rules

* Any action initiated by the user will be recorded in the user log. These may include:
  * Downloading a torrent
  * Changing their settings
  * Subscribing to a forum thread
  * Filling a request
  * etc...
* Any action initiated by an administrator that impacts a user. These may include:
  * Administrator changing settings on behalf of a user
  * Administrator changing the user's class
  * Administrator moving a user's forum thread
  * etc...
* Any action initiated by the system that impacts a user. These may include:
  * Class change due to criteria being met
  * Warning issued due to download:upload ratio being too low
  * etc...


## Use Cases

### 1.0 Viewing the user log

**Primary Actor:** A user

**Brief:** The user log must be present and accurate.

**Preconditions:** N/A

**Trigger:** User wants to see their own user log.

**Postconditions:** N/A

**Basic Flow:**

1. The user navigates to their user log page.

**Non-Functional Requirements:**

* User log is up-to-date.
* User log is complete and accurate.
