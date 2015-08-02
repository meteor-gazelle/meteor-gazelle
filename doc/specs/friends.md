# Authentication system

## Metadata

Author: flaming

### Changelog

**2015-08-02**

* Initial version

## Table of contents

1. Motivation
1. Business rules
1. Use cases
1. Data model

## Motivation

In a world with pseudonyms and nonstatic avatars rather than names and static faces (not counting facial burn victims, who account for only a small percent of the population), it helps to have a system by which users can tag other users as "worthy of remembering" in some sense, as well as record written notes pertaining to another user (e.g., "sent me a scarf for Secret Santa 2012! cool dude")

## Business rules

* Only User X can see User X's friend list.
* On every user profile page (excluding the logged-in user's own), there is an "Add friend" link. This is the primary method of adding friends.
* * This is not a facebook-style friend *request* system. If User X clicks the "Add friend" link on User Y's profile, then User Y is added to User X's friend list; no acknowledgement of this action is provided to User Y.
* If the logged-in user is already friends with the user, this is instead a "Remove friend" link.
* User X can add User Y to his/her friends list by navigating to User Y's user profile and clicking the "Add Friend" button.
* On the dedicated "Friends" page (navigable through the header "Friends" link), a list of the user's friends is provided. Each list element, listing friend X, contains the following:
* * X's user info: username, user class, ratio, upload amount, download amount
* * X's avatar
* * An editable text box labelled "Notes" containing any saved notes on X, along with an "Update" button which saves the box's current text.
* * A "Remove friend" button, which functions the same as clicking the "Remove friend" button on X's profile, but returns the user to this page ("Friends") rather than X's profile
* * A "Send message" button, which initiates composing an inbox message to X
* * A "Send Rippy" button, which initiates composing a Rippy to X

## Use cases

### 1. Editing notes

**Primary Actor:** A user

**Brief:** User X (the logged-in user) wishes to edit his saved notes for his friend Y.

**Preconditions:**

* User Y should be in User X's friend list already

**Trigger:** User X receives Secret Santa scarf in mail from User Y

**Postconditions:**

* User X's saved notes on Y are updated to reflect what User X entered in the Notes box

**Basic Flow:**

1. User navigates to "Friends" page
1. User edits the "Notes" text box pertaining to user Y
1. User clicks the "Update" button next to this text box

## Data model

*   Friend list `Schema`
* * `_id: {type: Number, ref: 'users'}` (ID of the logged in user)
* * Friends: `Array` of `{id: Number, notes: String}` elements
