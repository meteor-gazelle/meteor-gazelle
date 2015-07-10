
## Table of contents

1. Motivation
1. Business rules
1. Use cases
1. Data model

## Motivation

Provides a means for users of the site to communicate with each other in a typical forum fashion.


## Business rules

* User's are associated with an avatar
* User input/output interaction time stamps are logged, (thread creation time, forum post time, edit time, etc)
* Access to content and actions can be controlled via permission settings

## Use cases

### 1.0. Forum manager

**Primary Actor:** A privileged user who is managing the forum

**Brief:** Allows a user to mange the forum. Create forum sections, individual forums, modify the permissions on the forum, and so on.

**Preconditions:** The user carries the forum management permission

* The user carries the forum management permission

**Trigger:** When the user navigates to /forum/manage

**Postconditions:**

* Things that should be true after this use case is done
* Perhaps split in success/failure

**Basic Flow:**

1. The basic steps
1. the user takes through this part
1. while everything is going dandy

**Alternate flow:**

1. What if
1. there is an error

**Additional functional requirements:**
* Anything functional that can't be fitted in the above

**Applicable business rules:**

### Example: User modifies their password

**Primary actor:** User

**Brief:** Users will need to change passwords.

**Trigger:** User wants to change their password or is required to change their
password.

**Preconditions:**

* User has a valid password OR is resetting their password

**Postconditions:**
* Success
  * User has changed their password
  * Old sessions are invalidated.

**Basic flow:**

1. The user wants to change their password
1. The user is asked for their old password
   * This is only asked if the user is not performing a password reset.
1. The user is asked to enter their new password
1. The user is asked to enter their new password again
1. If the password verification matches, the new password matches the business
   rules and the old password is correct:
   * The system confirms the password has been changed.

**Alternate Flow:**

* The verification password doesn't match, the password doesn't match the rules
  or the user entered the wrong old password:
   1. Show the errors
   1. Go back to step 2

**Non-functional requirements:**

* The user should be informed that changing their password will cause them
  to be logged out from all devices.
* The user should be made aware what the requirements for passwords are.

**Functional Requirements:**

* Users should be able to be forced to change their password.

**Applicable business rules:**

* Password requirements (see above)

## Data model

What data should be tracked.

**Example:**
> * Users are identified a user name
> * User have a password
> * Users may have several application authorizations
> * Application authorizations have a name, date registered, date last used,
    status (active?) and contain the corresponding code.
> * Users may have a secondary means of authentication.
> * If users have a secondary means of authentication, they have backup codes.
> * Application authorization requests consist of the app name, the date the
    request was initiated, the unique authentication request code and the nonce.
