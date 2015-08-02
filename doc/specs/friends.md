ends system

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

In a world with pseudonyms and nonstatic avatars rather than names and static faces (not counting facial burn victims, who account for only a small percent of the population), it helps to have a system by which users can tag other users as "worthy of remembering" in some sense, as well as record written notes pertaining to another user (e.g., "sent me a scarf for Secret Santa 2012! cool dude")

## Business rules

* No information about User X's friend list, including the friend list as a whole as well as individual friend management actions taken by User X, shall be visible to anyone but User X him/herself.
* User X can have his/her access to the Friends system removed by staff.

## Use cases

### 1.1 Adding friends

**Primary actor:** User X

**Brief:** X can add friends to his/her friends list.

**Trigger:** User X navigates to User Y's profile

**Preconditions:**

* X is not already friends with Y
* X does not have his access to the friends functionality disabled

**Postconditions:**
* Y is added to X's friend list 

**Basic flow:**

1. X navigates to Y's user profile
2. X clicks the "Add friend" link on Y's profile

**Applicable business rules:**

* This action does not notify User Y in any way

### 1.2 Removing friends
**Primary actor:** User X

**Brief:** X can remove an arbitrary friend, say user Y, from his/her friends list.

**Trigger:** User X navigates to User Y's profile, **or** User X navigates to "Friends" page

**Preconditions:**
* X is already friends with Y
* X does not have his access to the friends functionality disabled

**Postconditions:**
* Y is no longer on X's friend list

**Basic flow:**
1. X clicks "Remove friend" link on Y's profile, or the "Remove Friend" link for Y on the "Friends" page

**Applicable business rules:**

* This action does not notify User Y in any way

### 2 Displaying friend list

**Primary actor:** User X

**Brief:** X would like to see a list of all his friend, as well as notes saved about them

**Trigger:** X clicks the "Friends" link in the site header

**Preconditions:**

* X does not have his access to the friends feature disabled

**Postconditions:**
* List of friends is displayed. Each list element (for friend Y) includes:
  * Y's user info: username, user class, ratio, upload amount, download amount
  * Y's avatar
  * An editable text box labelled "Notes" containing any saved notes on Y, along with an "Update" button which saves the box's current text.
  * A "Remove friend" button
  * A "Send message" button, which initiates composing an inbox message to Y
  * A "Send Rippy" button, which initiates composing a Rippy to Y

**Basic flow:**

1. User navigates to Friends page

### 2.1 Editing notes

**Primary Actor:** User X

**Brief:** X wishes to edit his saved notes for his friend Y.

**Preconditions:**

* User Y should be in User X's friend list already

**Trigger:** X navigates to "Friends" page

**Postconditions:**

* User X's saved notes on Y are updated to reflect what User X entered in the Notes box

**Basic Flow:**

1. User edits the "Notes" text box pertaining to user Y
1. User clicks the "Update" button next to this text box

**Applicable business rules:**

* This action does not notify User Y in any way
