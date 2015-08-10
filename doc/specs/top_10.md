# Top 10

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

Users are notified of the top 10 most popular albums on the website. Users can view the list in a homepage widget/module. Users can see the most popular albums by past day, past week, past month, and all-time.

## Business rules

- Users can enable or disable the top 10 list from displaying on their homepage.
- Each item in the list must display the album's title, artist, and release year.
- The top album must also display the album cover art.
- The list will be automatically updated periodically (12-24 hours?) by a ranking algorithm.

## Use cases

### 1.0 - Enabling the Top 10

**Actor:** A user.

**Brief:**  The Top 10 is enabled for display on the actor's homepage.

**Trigger:** The actor wants to enable the Top 10.

**Preconditions:**

 - The actor has the Top 10 widget/module disabled in their settings.

**Postconditions:**

 - The Top 10 widget/module is enabled and shown on the actor's homepage.

**Basic Flow:**

 - The actor navigates to their settings.
 - The actor toggles Top 10 from disabled to enabled.
 - The actor saves their settings.

### 1.1 - Disabling the Top 10

**Actor:** A user.

**Brief:**  The Top 10 is disabled for display on the actor's homepage.

**Trigger:** The actor wants to disable the Top 10.

**Preconditions:**

- The actor has the Top 10 widget/module enabled in their settings.

**Postconditions:**

- The Top 10 widget/module is disabled and hidden on the actor's homepage.

**Basic Flow:**

- The actor navigates to their settings.
- The actor toggles Top 10 from enabled to disabled.
- The actor saves their settings.

### 2.0 - Viewing the Top 10

**Actor:** A user.

**Brief:**  The Top 10 is displayed in order to notify the user of popular albums.

**Trigger:** The actor visits their homepage.

**Preconditions:**

 - The actor has the Top 10 widget/module enabled in their settings.

**Postconditions:**

 - The Top 10 albums are displayed in a sidebar widget/module on the actor's homepage.

**Basic Flow:**

 - The actor navigates to their homepage.

### 3.0 - Changing the Top 10 Time Range

**Actor:** A user.

**Brief:**  The Top 10 is updated to display the appropriate albums for the selected time range.

**Trigger:** The actor clicks on the dropdown arrow in the upper-right corner of the Top 10 widget/module.

**Preconditions:**

- The actor has the Top 10 widget/module enabled in their settings.

**Postconditions:**

- The Top 10 updates to show the appropriate albums for the selected time range.

**Basic Flow:**

- The actor navigates to their homepage.
- The user clicks the dropdown arrow in the upper-right corner of the Top 10 widget/module.
- The user selects an option from the past day, past week, past month, or all-time.
