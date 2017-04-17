# Charts

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Users can view the most popular items on the website based on various filters in terms of content type and date range. Users will be able to view charts in a section on their homepage or on a separate dedicated page.

## Business rules

- Users can enable/disable the charts of their choice from displaying on their homepage in batches of 10.
- Users can view all charts on the dedicated charts page in batches of 10, 100, or 250 items at a time.
- Users can view all charts by past day, past week, past month, or all-time.
- Charts will have a title, category, ranking type (z-score, high, low), and a query which determines the content that is shown in the chart.
- Each item in the list must contain information relevant to the item.

## Use cases

### 1.0 - Viewing the Charts page

**Actor:** A user.

**Brief:**  The charts page is displayed to the user showing them trending items.

**Trigger:** The user navigates to the charts page.

**Postconditions:** The charts page is displayed to the user.

### 2.0 - Changing a Chart's Date Range

**Actor:** A user.

**Brief:**  The chart is updated to display the appropriate items for the selected date range.

**Trigger:** The user selects to change the date range of a chart.

**Postconditions:** The chart updates to show the appropriate items for the selected date range.

**Basic Flow:**

 1. The user navigates to the chart page.
 2. The user changes the date range of the chart.
 3. The chart updates with appropriate items.

### 3.0 - Changing a Chart's Item Count

**Actor:** A user.

**Brief:**  The chart is updated to display the appropriate number of items selected.

**Trigger:** The user selects to change the number of items displayed in a chart.

**Postconditions:** The chart updates to show the appropriate number of items selected.

**Basic Flow:**

 1. The user navigates to the chart page.
 2. The user changes the item count of the chart.
 3. The chart updates with the appropriate number of items.

### 4.0 - Toggling the Charts homepage section

**Actor:** A user.

**Brief:**  The user wants to enable or disable charts for display on their homepage.

**Trigger:** The user wants to modify their charts setting.

**Postconditions:** The charts section is modified to the user's selection.

**Basic Flow:**

 1. The user navigates to their settings.
 2. The user chooses their preference of charts to display.
 3. The user saves their settings.

### 5.0 - Viewing the Charts homepage section

**Actor:** A user.

**Brief:**  The charts section is displayed in order to notify the user of popular items.

**Trigger:** The user visits their homepage.

**Preconditions:** The user has at least one chart enabled for display in their settings.

**Postconditions:** All enabled charts are displayed in a section on the user's homepage but are limited to batches of 10 items per chart at once.

### 6.0 - Creating a Chart

**Actor:** A user with chart permissions.

**Brief:**  Create charts to display popular items based on customizable criteria.

**Trigger:** The user navigates to the chart page and clicks the create button.

**Preconditions:** The user has permissions allowing them to create charts.

**Postconditions:** A chart is created and displayed on the dedicated charts page.

**Basic Flow:**

 1. The user navigates to the charts page.
 2. The user clicks the create button.
 3. The user enters chart details.
 4. The user saves the chart.

### 7.0 - Modifying a Chart

**Actor:** A user with chart permissions.

**Brief:**  Allow users to modify the settings of created charts.

**Trigger:** The user navigates to the chart page and clicks the edit button on a chart.

**Preconditions:** The user has permissions allowing them to modify charts.

**Postconditions:** The chart is updated and displayed on the dedicated charts page.

**Basic Flow:**

 1. The user navigates to the charts page.
 2. The user clicks the edit button.
 3. The user changes chart details.
 4. The user saves the chart.

### 8.0 - Deleting a Chart

**Actor:** A user with chart permissions.

**Brief:**  Allow users to delete a chart that is no longer wanted.

**Trigger:** The user navigates to the chart page and clicks the delete button on a chart.

**Preconditions:** The user has permissions allowing them to delete charts.

**Postconditions:** The chart is deleted and no longer displayed on the dedicated charts page.

**Basic Flow:**

1. The user navigates to the charts page.
2. The user clicks the delete button.
3. The user clicks accept on the confirmation dialog.
