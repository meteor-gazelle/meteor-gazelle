# Authentication system

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

The site is a walled garden, in which its community shares lots of great content.
To keep the community in great shape and to ensure quality control, the website
is not publicly accessible. Restricted access ensures that bad people are (mostly)
kept out and keeps the site community and economy healthy.

## Business rules

Business rules are principles that should be honored throughout the application.
They are not technical requirements, but specify what is needed to "help the
organization achieve its goals." (Wikipedia)

* Users need always be identifiable
* For each user, it should be recorded when they last accessed the site.
* The devices from which a user logs in should be recorded. This information
  should include user agent, source IP address, authentication method and time.
* If a user transfers a session to a different IP address, the new information
  should also be recorded. (cookie stealing, proxies, 3g connections, etc)
* Accessing the website from certain addresses may be prohibited by staff.
* Authentication should always happen through a secure channel.
* Authentication tokens such as passwords should be stored in a non-reversible
  manner.
* Users should be IP-blocked for an amount of time if they fail authentication
  or try to reset a password  more than a configurable number of times.
* Users should be informed of the ways they can reset passwords or bypass
  secondary authentication, even if they have not failed authentication yet.
* Resets of passwords should expire all active sessions and
  authentication tokens for that user.
* Password reset links should expire after a set number of hours.
* Users may set up a secondary means of authenticating. If they have set
  this up, they must be asked to further authenticate once they've authenticated
  using their username and password.
* If users set up secondary authentication they should be provided with
  a set of one-time passwords to bypass secondary authentication.
* If a user loses their secondary authentication method and loses their one-time
  passwords, they will need to contact moderators through IRC to disable secondary
  authentication.
* Users may have at most one secondary means of authentication.
* Passwords should abide by the following rules:
  * They should be at least 8 characters loong
  * If a password is shorter than 20 characters:
    * They should contain at least 1 lowercase character
    * They should contain at least 1 uppercase character
    * They should contain at least 1 number or 1 symbol character
  * They should not have a maximum length less than 50 characters
* Moderators should be able to disable two-factor authentication for users.
* Moderators should be able to require users to change their password.
* Moderators should be able to change passwords, but this requires users to
  change their password.
* Moderators should be able to force a password reset email.
* Resetting a password must not disable second-factor authentication.
* The age of a password should be recorded in the database.

## Use cases

These use cases describe various ways the authentication system will interact.

1. Users need to be able to authenticate by supplying their user name and
   password. This is the default mode of operation.
2. The user shows they have the secondary means of authentication.
3. User allows an application to use their account.
4. User modifies their password
5. User configures additional authentication
6. User reviews authorized applications and active sessions
7. User resets their password.
8. A moderator reviews security settings

### 1. User authenticates with a password

**Primary actor:** User

**Brief:** User supplies their username and password. These are verified and if
found to be correct the user is identified and logged in to the website.

**Preconditions:**
* A user has an account on the website with a corresponding password.
* The user is not currently logged in.
* The user has not failed to authenticate more than a configurable number of times already.
* The user is not connecting from a blocked IP-block.

**Trigger:** User tries to access a page but they do not currently have
an active session.

**Postconditions:**
* Success:
  * The user is authenticated using their password.
  * The failed-authentication count is reset
  * The log-in is logged to the session log.
* Failure
  * The failed-authentication count is incremented.

**Basic flow:**

1. User is presented with a form requesting a username and password
1. User provides their username and password
1. User is forwarded to the secondary authentication page if applicable
   or forwarded to the page they initially tried to visit.

**Alternate flow:**

* Authentication fails:
  * User is told their credentials were incorrect and to try again.
  * User is also told how many attempts they have remaining.
  * User is shown the instructions to retrieve their password.
* User is locked out:
  * User is shown the time remaining for the ban to expire.
  * User is shown the instructions to retrieve their password.

**Additional functional requirements:**

* Always increment the number of attempts, even before checking authentication.

### 2. User uses two-factor authentication

**Primary actor:** User

**Brief:** User uses their source for two-factor authentication to further
authenticate.

**Preconditions:**
* User has successfully used a primary means of authentication
* User has beforehand set up secondary authentication.

**Trigger:** User has successfully authenticated and has set up secondary
authentication.

**Postcondition:**
* Success
  * The user's session is activated.
  * If a one-time backup code is used, the code is invalidated and the user
    is forwarded to the second-factor configuration page.
* Failure
  * The user may not proceed and will need to retry with a fresh token.

**Basic flow:**

1. The user has just logged in. They are presented a screen asking them to
further authenticate using a token.
1. User provides the token.
1. User is forwarded to the page they tried to visit pre-authentication, or to
the homepage.

**Alternate flow:**

* Authentication fails:
  * Try again
* User chooses to enter a one-time code.
  * User enters the one-time code.

**Additional functional requirements:**

* Supported secondary authenticators should include TOTP codes (Google
  Authenticator).
* It should be able to implement additional methods later.

### 3. User allows an application to use their account

**Primary actor:** User

**Brief:** Applications might need access to the user account. This use case
provides users with the means to provide access without providing their password.

**Trigger:** User tries to use an app which needs access.

**Postconditions:**
* Success:
  * The application is provided with an authentication token to use for further
    requests.

**Basic flow:**

*Note:* I peeked at OAuth 2 a bit but this method is simplified and not an
implementation of the standard. It may be desirable to get a full OAuth 2 stack
but in that case just replace the workflow below.

1. The user tries to use an app which needs to authenticate.
1. The app sends an authentication request to the API. This request contains
the app name.
1. The server responds to this request by providing the app with a URL and a
nonce.
1. The app provides this URL to the user.
1. The user visits the provided url. If the user isn't authenticated, first
   authenticate.
1. The user can review the name of the app and decide to provide permission.
1. If the user decides to provide permission, they are provided with an
   application code.
1. The user enters the application code in the app.
1. The app uses this code and the nonce received earlier to request an
   authentication token.

**Alternate flow:**

* The user rejects authentication, but that wraps up things at the site's side.

**Functional requirements:**

* App might be another device, such as a server or phone, on which the user is
  not authenticated.
* Apps should be able to just submit this authentication token along with
  requests to the API. They should not have to first get a cookie.

### 4. User modifies their password

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
   * If not: goto 2.

**Non-functional requirements:**

* The user should be informed that changing their password will cause them
  to be logged out from all devices.
* The user should be made aware what the requirements for passwords are.

**Functional Requirements:**

* Users should be able to be forced to change their password.

**Applicable business rules:**

* Password requirements (see above)

### 5. User configures additional authentication

**Primary actor:** User

**Brief:** A user configures an additional authentication token such as a TOTP
code.

**Trigger:** A user wants to change their 2FA settings.

**Preconditions:**

* The user has a supported two-factor authentication method

**Postconditions:**

* The site will ask for the second factor every time the user tries to
  authenticate.
* The user has been provided with one-time passwords to be used to bypass
  second factor authentication.

**Basic flow:**

1. The user indicates that they want to configure a second factor
1. If the site supports multiple second factors, ask what factor to configure.
1. Perform the associating procedure
   * e.g. Google Authenticator:
     1. Display QR-code with instructions
   * e.g. Yubikey:
     1. Ask for key id.
1. Confirm the user has correctly configured the second factor by asking them
   to provide an authentication code and verifying it.
1. Confirm everything went correct.
1. Provide the user with ten one-time passwords and the instructions to store
   those in a safe place.

**Alternate flow:**

1. The user wishes to disable two-factor authentication.
1. The user

**Non-functional requirements:**

* The user should be explained that the second factor cannot be disabled if
  lost, unless the user has a one-time password (Otherwise, the user will
  need to visit IRC).

**Functional requirements:**

* The site should at least support Google Authenticator (TOTP codes).

**Business rules:**

* The user may have at most one second factor.
* Moderators should be able to disable the second factor.
* If users set up secondary authentication they should be provided with
  a set of one-time passwords to bypass secondary authentication.
* If a user loses their secondary authentication method and loses their one-time
  passwords, they will need to visit IRC to disable secondary
  authentication.

### 6. The user reviews authorized applications and active sessions

**Primary actor:** User or a moderator

**Brief:** The users should be able to review authentication tokens,
and be allowed to revoke any currently authorized authentication tokens.
Moderators can do this to any user

**Trigger:** The user indicates they want to review the authentication tokens
The moderator indicates he/she wants to do this for some user.

**Postconditions:**

* Any deactivated applications will need to re-authenticate to continue to be
  able to access the user's account.
* Any ended session will no longer be valid.

**Basic Flow:**

1. The user indicates they want to review authorized applications and currently active sessions
1. The site displays a list of applications the user has previously authorized and the currently active sessions of that user.
1. The user might choose to deactivate any application or end any active session.
1. If so the site asks for confirmation.
1. The user confirms
1. The application is deactivated or the session is expired.

**Functional requirements:**

* Currently authorized applications should be listed at the top, sorted by
  activation date.
* The name of the app and the date the app was last used should be displayed.
* Already deactivated authorizations should be listed at the bottom of the list of active authorisations,
  to preserve the ability to audit account access.
* Already expired sessions should be listed at the bottom of the list of sessions.

**Non-functional requirements:**

* This page should explain to immediately contact staff in case any misuse is
  suspected.

### 7. Reset password

**Primary actor:** User

**Brief:** Users forget passwords or usernames. This use case allows them to
retrieve their username or set a new password.

**Trigger:** The user indicates they want to reset their password.

**Preconditions:**

* The user is not currently logged in.
* The user has not tried to reset more than a configurable number of times already.
* The user is not connecting from a blocked IP-block.
* The user has access to the email address they used to set up their account.

**Postconditions:**

* The user has a new password.
* Any active authentication methods are disabled.

**Basic flow:**

1. The user wants to reset their password
1. The site asks the user for their email
1. The site indicates that an email will be sent to the email address.
1. The site sends an email with either:
   1. "The email address was not recognised"
   1. "This is your username, to reset your password follow <link>"
1. If the user follows the link, they will be asked to change their password
   according to use case 4.

**Business rules:**

* Reset links should expire after a set number of hours.
* This should not disable any configured second factors.
* Users should be IP-blocked for an amount of time if they fail authentication
  or try to reset a password  more than a configurable number of times.
* Users should be informed of the ways they can reset passwords or bypass
  secondary authentication, even if they have not failed authentication yet.
* Resets of authentication methods should expire all active sessions and
  authentication tokens for that user.

### 8. A moderator reviews a user's security settings

**Primary actor:** Moderator

**Brief:** Moderators need to review the account security of users.

**Trigger:** The moderator reviews the users security settings

**Precondition:**

* The moderator has the relevant access levels

**Postconditions:**

* If the moderator disables 2FA, the user will no longer be required to provide
  their second factor.
* If the moderator requires the user to change their password, the user will
  need to do so on their next page view.
* If the moderator terminates all running sessions, the user will no longer have
  active sessions.
* If the moderator revokes any application authorization, the app will no
  longer be able to access the user's account.
* If the moderator changes the user's password, the user will only be able to
  log in next with their new password. In addition will the user no longer have
  active sessions.
* If the moderator chooses to send a password reset email, the user receives
  a reset email on the configured email address.

**Basic Flow:**

1. The moderator decides to view a user's security settings.
1. The site displays the date the user's password was last change, if the
   user has configured two-factor authentication and what kind of authentication
   that is. The site also allows the moderator to review the authorized
   applications like use case 7.
1. The moderator may choose to do one or more of the following:
   * terminate the users all running sessions
   * change the user's password
   * disable two-factor authentication
   * Send a password reset email
1. The site asks for confirmation.
1. The moderator confirms
1. The site performs the requested changes.

**Business rules:**

* Moderators should be able to disable two-factor authentication for users.
* Moderators should be able to require users to change their password.
* Moderators should be able to change passwords, but this requires users to
  change their password.
* Moderators should be able to force a password reset email.

## Data model

This data model is by no means complete.

* Users are identified a user name
* User have a password
* Users may have several application authorizations
* Application authorizations have a name, date registered, date last used,
  status (active?) and contain the corresponding code.
* Users may have a secondary means of authentication.
* If users have a secondary means of authentication, they have backup codes.
* Application authorization requests consist of the app name, the date the
  request was initiated, the unique authentication request code and the nonce.
