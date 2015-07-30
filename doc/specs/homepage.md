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

* **Site News**: An announcement containing critical information about the site. This section must appear at the top of the page & may not be removed by the user.

* **Notifications**: A summary of the current user's notifications. Displays a maximum of five notifications at a time. Each notifications details may be expanded/collapsed. A user may hide the notification on this screen. Finally, the user may navigate to the notifications page.

* **Blog & Announcements**: The latest posts from the announcements forum.

* **Usage Statistics**: Graphical summary of a user's usage statistics, broken up by weeks, months, & years.

* **Album of the Week**: An album selected by a staff member. Displays album title, artist, year, & cover art. Links to album page.

* **Top Ten Albums**: List of the site's top ten albums, each linking to their respective album page. Data can be displayed for the past twenty-four hours, seven days, month, or year.

* **Random Album**: A random album on the site. Displays album title, artist, year, & cover art. Links to album page.

* **Site Statistics**: Summary of the site's statistics. Displays data transfered, number of torrents uploaded, number of new users, number of forum posts, & number of requests filled. Data can be displayed for the past seven days, month, or year.

All empty sections are not visible. The user may personalize their homepage by adding, removing, & re-ordering section. However, the "Site News" section must appear at the top & cannot be removed.

## Use cases

### 1.0 Add a homepage section

**Primary Actor:** User

**Brief:** Users personalize their homepage by adding a section.

**Trigger:** User wants to add a section to their homepage

**Preconditions:**

* User has not already added all sections to their homepage.

**Postconditions:**

* Success
  * Section is now visible in the user's homepage in the desired column

**Basic flow:**

1. The user clicks the add button/icon in the desired column on the homepage.
1. The user is asked which section they would like to add. The user selects the desired section.

### 1.1 Remove a homepage section

**Primary Actor:** User

**Brief:** Users personalize their homepage by removing existing sections.

**Trigger:** User wants to remove a section from their homepage.

**Preconditions:**

* User has at least one section already added to their homepage.

**Postconditions:**

* Success
  * Section is now removed from the homepage

**Basic flow:**

1. The user clicks the remove button/icon on the desired section
1. The user is asked to confirm their choice.

### Re-order homepage sections:

**Primary Actor:** User

**Brief**: User personalize their homepage by re-ordering sections

**Trigger**: User wants to re-order the sections on their homepage.

**Preconditions:**

* User has at least two sections already added to their homepage.

**Postconditions:**

* Success
  * All sections appear in the desired order in the desired columns

**Basic flow:**

1. User drag & drops the section to the desired location by the sections header or handle icon.

## Data model

* Homepage Section
  * Column
  * Sequence
  * Contents
