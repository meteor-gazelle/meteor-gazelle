# User Settings

## Metadata

Author: Tick

### Changelog

**2015-07-28**

* Initial version

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

Provides a means for users of the site to configure and personalise their usage of the site.

## Business rules.

 - A user can only edit the own settings
 - Administrators with the right permissions can edit another user's settings.

Settings can be configured for:

* **Site Appearance**: Stylesheets and fonts.

* **Torrents**: Appearance of search results and cover art.

* **Community**: Forums, inbox, avatars and Rippy.

* **Notifications**: News announcements, inbox messages, announcements, forum threads, torrent notifications, etc...

* **Personal**: Avatar, Last.fm and title.

* **Paranoia**: Profile elements to display to other users - Posts, comments, requests, torrents, etc...

* **Access**: Password, email address and passkey.

## Use cases

### User changes own setting

**Actor:** User.

**Brief:**  A user can change their own settings to interact with the site differently.

**Trigger:** User wants to change a setting.

**Postconditions:**

 - The user's settings are updated.
 - The user's log is updated.

**Basic Flow:**

 1. The user navigates to their own settings page.
 2. The user changes the setting to the desired value.
 4. The user saves the changes to their settings.

### Administrator changes another user's setting

**Actor:** Administrator.

**Brief:**  An administrator can change another user's settings.

**Trigger:** Administrator wants to change a user's setting.

**Postconditions:**

 - The user's settings are updated.
 - The user's log is updated.

**Basic Flow:**

 1. The administrator navigates to the user's settings page.
 2. The administrator changes the setting to the desired value.
 4. The administrator saves the changes to the user's settings.
