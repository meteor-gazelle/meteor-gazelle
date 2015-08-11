# Top 10

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Users are notified of the top 10 most popular items on the website. Users can view the list in a homepage widget or on a separate dedicated page. Users can see the most popular items by past day, past week, past month, and all-time.

## Business rules

- Users can enable or disable the top 10 list from displaying on their homepage.
- Each item in the list must contain information relevant to the item.
- The list will be automatically updated by a ranking algorithm.
- The list update interval will be configured in the settings.json file.

## Use cases

### 1.0 - Modifying the Top 10 widget

**Actor:** A user.

**Brief:**  The user wants to enable or disable the Top 10 for display on their homepage.

**Trigger:** The user wants to modify their Top 10 setting.

**Postconditions:**

 - The Top 10 widget is modified to the user's selection.

**Basic Flow:**

 1. The user navigates to their settings.
 2. The user chooses their preference for the Top 10 widget.
 3. The user saves their settings.

### 2.0 - Viewing the Top 10 widget

**Actor:** A user.

**Brief:**  The Top 10 is displayed in order to notify the user of popular items.

**Trigger:** The user visits their homepage.

**Preconditions:**

 - The user has the Top 10 widget enabled in their settings.

**Postconditions:**

 - The Top 10 items are displayed in a widget on the user's homepage.

**Basic Flow:**

 1. The user navigates to their homepage.

### 3.0 - Viewing the Top 10 page

**Actor:** A user.

**Brief:**  The Top 10 is displayed in order to notify the user of popular items.

**Trigger:** The user visits the Top 10 page.

**Postconditions:**

 - The Top 10 items are displayed.

**Basic Flow:**

 1. The user navigates to the Top 10 page.

### 4.0 - Changing the Top 10 Date Range

**Actor:** A user.

**Brief:**  The Top 10 is updated to display the appropriate items for the selected date range.

**Trigger:** The user selects to change the date range of the Top 10 widget or Top 10 page.

**Postconditions:**

 - The Top 10 updates to show the appropriate items for the selected date range.

**Basic Flow:**

 1. The user navigates to the page.
 2. The user changes the date range of the Top 10.
 3. The Top 10 updates with appropriate items.
