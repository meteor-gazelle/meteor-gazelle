# Site Header

## Metadata

Author: sneakysneaky

### Changelog

**2015-07-13**

* Initial version

## Table of contects

1. Motivation
1. Business rules
1. Use cases
1. Data model

## Motivation

The site header is a critical UI element. It provides the user with navigation links to the rest of the site, displays basic user info, and provides additional site branding.

## Business rules

* The header is only visible to authenticated users.
* The header visually appears the same on all pages. The navigation elements may vary from page to page, & only to indicate the current page.

* The following UI elements are accessible on all screen sizes. Elements may be initially hidden for ease of use, but all elements can be accessed without navigating to another page.
  * Site Title (Gazelle)
  * Primary navigation routes
    * Torrents
      * All torrents
      * Collages
      * Notifications
    * Requests
    * Help
      * All torrents
      * Collages
      * Notifications
    * Forums
    * IRC
    * Store
    * Donate
  * Secondary Navigation
    * Inbox
    * New Upload
    * Uploads
    * Statistics
    * Bookmarks
    * Notifications
    * Subscriptions
    * Comments
    * Friends
    * Invite
    * Edit Profile
    * Logout
    * Custom links
  * Basic user statistics
    * Username
    * Uploaded
    * Downloaded
    * Ratio
    * Required Ratio
    * Number of invites
  * New Notifications Count
  * Unified search box

* The following UI elements are optional & may be hidden on smaller screen sizes for ease of use.
  * Navigation to refined torrent filters
    * Music
    * Applications
    * Literary
    * Learning
    * Comedy
    * Comics
  * User Avatar
  * Notification summaries
    * Torrent notifications
    * Forum notifications
    * New messages
  * Refined search boxes

## Use cases

### 1.0 Unified Search

**Primary Actor:** A user

**Brief:** The user is able to search torrents, artists, labels, requests, forums, logs, & users via a single input.

**Triger:** When the user inputs into the unified search box

**Postconditions:** Unified search results are displayed.

**Basic Flow:**

1. The user inputs a search query into the unified search box.
1. Auto-suggested search results are displayed as the user types.
1. If user selects an auto-suggested result, the user is routed to the detailed view of that item (torrent, artist, etc).
1. User is routed to a search-results view when either the <enter> key is pressed or the "Search" button is clicked.

### 1.1 Refined Search

**Primary Actor:** A user

**Brief:** The user is able to search torrents, artists, labels, requests, forums, logs, & users via individual search inputs.

**Trigger:** When the user clicks the "expand search" icon.

**Postconditions:** Refined search results are displayed.

**Basic Flow:**

1. The user clicks the "expand search query" icon/button (i.e. hamburger). Individual search fields for torrents, artists, labels, requests, forums, logs, & users appear.
1. The user inputs a search query into the one of the search boxes.
1. Auto-suggested search results are displayed as the user types.
1. If user selects an auto-suggested result, the user is routed to the detailed view of that item (torrent, artist, etc).
1. User is routed to a search-results view when either the <enter> key is pressed or the "Search" button is clicked.

### 2.0 View Notifications Summary

**Primary Actor:** A user

**Brief:** The user is able to see a summary of their notifications in the header.

**Trigger:** When the user expands the notifications menu

**Postconditions:** The notifications summary is visible

**Basic Flow:**

1. The user clicks on the "expand notifications" button.
1. A summary of notifications are displayed to the user.
1. When the user clicks on the "See All Notifications" button, the user is routed to a detailed list of notifications.

**Implementation Notes**

* Read & unread notifications should be styled distinct from one another (i.e. bold all unread notifications)
* The number of unread notifications needs to appear somewhere in the header (i.e. over the avatar). If there are no unread notifications, this number does not appear.

### 3.0 Custom Links

**Primary Actor:** A user

**Brief:** The user is able view & navigate to the custom links that they are created.

**Preconditions:** User has added custom links in their profile.

**Postconditions:** Custom links are visible to the user.

**Basic Flow:**

1. Custom links are visible in the header
1. When user clicks on a custom link, the user is routed to that custom page.

## Data model

* Authenticated user information
  * Username
  * Avatar
  * Uploaded
  * Downloaded
  * Ratio
  * Required Ratio
  * Number of Notifications
* Current route / page
* Notifications
