## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Provides a means for users of the site to configure and personalise their usage of the site.

## Business rules.

 * A user can only edit their own settings, unless they have the user_settings_administration permission enabled.

Settings can be configured for:

* **Site Appearance**: Stylesheets and fonts.

* **Torrents**: Appearance of search results and artwork.

* **Community**: Forums, inbox, and avatars.

* **Notifications**: News announcements, inbox messages, announcements, forum threads, torrent notifications, etc.

* **Personal**: Avatar and title.

* **Paranoia**: Profile elements to display to other users - Posts, comments, requests, torrents, etc.

* **Access**: Password, email address and passkey.

## Use cases

### 1.0 User changes own setting

**Actor:** A user

**Brief:**  A user can change their own settings to interact with the site differently.

**Trigger:** User wants to change a setting.

**Postconditions:**

 - The user's settings are updated.
 - The user's log is updated.

**Basic Flow:**

 1. The user navigates to their own settings page.
 2. The user changes the setting to the desired value.
 3. The user saves the changes to their settings.

**Notes:**
  * See [authentication specs](Authentication.md) for more information regarding changing passwords, two-factor
    authentication, etc.

### 1.1 User changing another user's settings

**Actor:** A user

**Brief:**  An user with the proper permission can change another user's settings

**Trigger:** User wants to change another user's setting.

**Precondition:** The user has the user_settings_administration permission enabled.

**Postconditions:**

 - The user's settings are updated.
 - The user's log is updated.

**Basic Flow:**

 1. The user navigates to the user's settings page.
 2. The user changes the setting to the desired value.
 3. The user saves the changes to the user's settings.

**Notes:**
  * See [authentication specs](Authentication.md) for more information regarding changing passwords, two-factor
    authentication, etc.
