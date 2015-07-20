# Homepage

## Metadata

Author: sneakysneaky

### Changelog

**2015-07-15**

* Inititial version

## Table of contents

1. Motiviation
1. Business rules
1. Use cases
1. Data model

## Motivation

The homepage is the initial landing page for all authenticated users. It provides users with a summary of site activity while enabling them to navigate to other areas of the site easily.

## Business rules.

The homepage contains the following sections:

* **Site News**: An announcement containing critical information about the site. This section must appear at the top of the page.

* **Notifications**: A summary of the current user's notifications. Displays a maximum of five notifications at a time. Each notifications details may be expanded/collapsed. A user may hide the notification on this screen. Finally, the user may navigate to the notifications page.

* **Blog & Announcements**: The latest posts from the announcements forum.

* **Usage Statistics**: Graphical summary of a user's usage statistics, broken up by weeks, months, & years.

* **Album of the Week**: An album selected by a staff member. Displays album title, artist, year, & cover art. Links to album page.

* **Top Ten Albums**: List of the site's top ten albums, each linking to their respective album page. Data can be displayed for the past twenty-four hours, seven days, month, or year.

* **Random Album**: A random album on the site. Displays album title, artist, year, & cover art. Links to album page.

* **Site Statistics**: Summary of the site's statistics. Displays data transfered, number of torrents uploaded, number of new users, number of forum posts, & number of requests filled. Data can be displayed for the past seven days, month, or year.

All empty sections are not visible. The "Site News" section must appear at the top. All other sections may be ordered at the discretion of the theme author.

## Use cases

### 1.0 Clear Notification

**Primary Actor:** A user

**Brief**: User can mark a notification as read from the homepage.

**Preconditions:** User has at least one unread notification

**Basic Flow:**

1. User clicks the "clear" icon/button next to the desired notification. That notification is marked as read.

### 1.1 Clear All Notifications

**Primary Actor:** A user

**Brief**: User can mark all visible notifications as read from the homepage.

**Preconditions:** User has at least one unread notification

**Basic flow:**

1. User clicks the "clear all" icon/button. All visible notifications are marked as read.

## Data model

* Notifications
  * ID
  * Title
  * Type
  * Timestamp
  * Body

* Blog / Announcement
  * Title
  * Banner image
  * Body
  * Timestamp

* Album
  * ID
  * Title
  * Artist
  * Year

* Site Statistics
  * Data transfered
  * Number of Torrents Uploaded
  * Number of New Users
  * Number of Forum Posts
  * Number of Requests Filled

* Usage Statistics
  * Data transferred per current user
