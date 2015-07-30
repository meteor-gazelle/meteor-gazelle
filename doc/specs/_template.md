# Authentication system

## Table of contents

1. Motivation
1. Business rules
1. Use cases
1. Data model

## Motivation

**Example:**

>The site is a walled garden, in which its community shares lots of great content.
To keep the community in great shape and to ensure quality control, the website
is not publicly accessible. Restricted access ensures that bad people are (mostly)
kept out and keeps the site community and economy healthy.

## Business rules

Business rules are principles that should be honored throughout the application.
They are not technical requirements, but specify what is needed to "help the
organization achieve its goals." (Wikipedia)

**Example:**
> * For each user, it should be recorded when they last accessed the site.
> * The devices from which a user logs in should be recorded. This information
    should include user agent, source IP address, authentication method and time.
> * The age of a password should be recorded in the database.

## Use cases

These use cases describe various ways the authentication system will interact.

**Use cases:**

1. Some use case

**Example:**
>1. Users need to be able to authenticate by supplying their user name and
   password. This is the default mode of operation.
> 2. The user shows they have the secondary means of authentication.

### 0. Template use case

**Primary Actor:** The actor interacting with this use case

**Brief:** Brief summary

**Preconditions:**

* Things that should be true before this use case is entered

**Trigger:** When this use case starts

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
