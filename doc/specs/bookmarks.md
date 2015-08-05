# Bookmarks

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

Provide a system for users to bookmark torrent groups, artists, collages, 
or requests made on the website

## Business rules

* Users are able to bookmark a torrent group, artist, collage, or reqyest.
* Users are able to remove booksmarks
* Users are able to sort bookmarks in ascending or descending order based on different fields.
* Users can receive notifications about certain bookmarks. 

## Use cases

### 1. Torrent Group Bookmarking


#### 1.0 Adding a Torrent Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to add a bookmark for an torrent group.

**Trigger:** The user wishes to bookmark a torrent group.

**Preconditions:** The user has not already bookmarked the torrent group

**Postconditions:** The torrent group is now bookmarked for that user

**Basic Flow:**

 1. The user navigates to the torrent group page.
 2. The user clicks the "Bookmark" hyperlink.
 3. The torrent group is bookmarked for that user.
 
**Additional functional requirements:**
 - The hyperlink function should also change to that of removing the bookmark

**Additional non-functional requirements:** 
 -  The hyperlink text is updated to "Remove Bookmark"
 
 
#### 1.1 Removing a Torrent Group Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to remove a bookmark for a torrent group.

**Trigger:** The user wishes to remove the bookmark for a torrent group.

**Preconditions:** The user has already bookmarked the torrent group.

**Postconditions:** The torrent group is no longer bookmarked for that user. Also the 
torrent ranking will be spliced from the overall bookmark list.

**Basic Flow:** 

 1. The user navigates to the torrent group page.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The torrent group bookmark is removed.

**Additional functional requirements:** 
 - The hyperlink function should also change to that of adding a bookmark.
 - The torrent group bookmark rankings should be spliced accordingly.

**Additional non-functional requirements:**
 - The hyperlink text is updated to "Bookmark" 
 
 **Alternate Flow:**
 
 1. The user has navigated to the Bookmarks page for Torrents.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The torrent group bookmark is removed.
 
**Additional functional requirements:** 
 - The torrent group bookmark rankings should be spliced accordingly.

**Additional non-functional requirements:**
 - The torrent group listing should be removed from the page. 
 
 
#### 1.2 Managing Bookmarked Torrent Groups

**Primary Actor:** Any user.

**Brief:** Allows the user to enable notifications for a bookmarked artist.

**Trigger:** The user wishes to receive notifications about new uploads for a bookmarked artist.

**Preconditions:** The user has already bookmarked the artist.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks "Notify of new uploads" in the target artists row.

**Additional functional requirements:** 
 - Upload notifications for that artist should be enabled for the user. 
 - The hyperlink function should be changed to that of disabling notifications. 

**Additional non-functional requirements:**
 - The "Notify of new uploads" hyperlink should now read "Do not notify of new uploads". 

 
#### 2.3 Disabling Notification for Bookmarked Artists
 
**Primary Actor:** Any user.

**Brief:** Allows the user to disable notifications for a bookmarked artist.

**Trigger:** The user no longer wishes to receive notifications about new uploads for a bookmarked artist.

**Preconditions:** The user has already enabled upload notifications for the artist.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks "Do not notify of new uploads" in the target artists row.

**Additional functional requirements:** 
 - Upload notifications for that artist should be disabled for the user. 
 - The hyperlink function should be changed to that of enabling notifications. 

**Additional non-functional requirements:**
 - The "Notify of new uploads" hyperlink should now read "Notify of new uploads". 
 
 
#### 2.4 Viewing All Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to view artist bookmarks.

**Trigger:** The user wants to view artist bookmarks.

**Preconditions:** The user has already bookmarked at least one artist. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the Artists hyperlink.

**Additional non-functional requirements:** 
 - The table displayed has the following columns: Artist Name, Number of Torrent Groups
 
 
#### 2.4 Sorting All Bookmarked Artist Rows 

**Primary Actor:** Any user.

**Brief:** Allows the user to sort the rows of a bookmark collection based on different fields.

**Trigger:** The user wants to sort by Artist Name, or Number of Torrent Groups.

**Preconditions:** The user has already bookmarked at least two artists. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks on the column title.

**Additional functional requirements:**
 - If a column is not currently being used for sorting all other column sorts are removed and 
 it is the table is sorted in descending order by that column.
 - If the column is currently used for descending order, the order is now set to 
 ascending order for that column.
 - If the column is currently used for ascending order, the order is now set to 
 descending order for that column.
 
**Additional non-functional requirements:** 
 - The table order should be sorted based on the user selection and logic above. 

### 2. Artist Bookmarking

#### 2.0 Adding an Artist Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to add a bookmark for an artist.

**Trigger:** The user wishes to bookmark an artist.

**Preconditions:** The user has not already bookmarked the artist

**Postconditions:** The artist is now bookmarked for that user

**Basic Flow:**

 1. The user navigates to the artist page.
 2. The user clicks the "Bookmark" hyperlink.
 3. The artist is bookmarked for that user.
 
**Additional functional requirements:**
 - The hyperlink function should also change to that of removing the bookmark

**Additional non-functional requirements:** 
 -  The hyperlink text is updated to "Remove Bookmark"
 
 
#### 2.1 Removing an Artist Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to remove a bookmark for an artist.

**Trigger:** The user wishes to remove the bookmark for an artist.

**Preconditions:** The user has already bookmarked the artist.

**Postconditions:** The artist is no longer bookmarked for that user. Also in the case that
notifications were set, the notifications will be removed. 

**Basic Flow:** 

 1. The user navigates to the artist page.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The artist bookmark is removed.

**Additional functional requirements:** 
 - The hyperlink function should also change to that of adding a bookmark.
 - Notifications for that artist should be disabled for the user. 

**Additional non-functional requirements:**
 - The hyperlink text is updated to "Bookmark" 
 
 **Alternate Flow:**
 
 1. The user has navigated to the Bookmarks page for Artists.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The artist bookmark is removed.
 
**Additional functional requirements:** 
 - Notifications for that artist should be disabled for the user. 

**Additional non-functional requirements:**
 - The artist row should be removed from the page. 
 
 
#### 2.2 Enabling Notifications for Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to enable notifications for a bookmarked artist.

**Trigger:** The user wishes to receive notifications about new uploads for a bookmarked artist.

**Preconditions:** The user has already bookmarked the artist.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks "Notify of new uploads" in the target artists row.

**Additional functional requirements:** 
 - Upload notifications for that artist should be enabled for the user. 
 - The hyperlink function should be changed to that of disabling notifications. 

**Additional non-functional requirements:**
 - The "Notify of new uploads" hyperlink should now read "Do not notify of new uploads". 

 
#### 2.3 Disabling Notification for Bookmarked Artists
 
**Primary Actor:** Any user.

**Brief:** Allows the user to disable notifications for a bookmarked artist.

**Trigger:** The user no longer wishes to receive notifications about new uploads for a bookmarked artist.

**Preconditions:** The user has already enabled upload notifications for the artist.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks "Do not notify of new uploads" in the target artists row.

**Additional functional requirements:** 
 - Upload notifications for that artist should be disabled for the user. 
 - The hyperlink function should be changed to that of enabling notifications. 

**Additional non-functional requirements:**
 - The "Notify of new uploads" hyperlink should now read "Notify of new uploads". 
 
 
#### 2.4 Viewing All Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to view artist bookmarks.

**Trigger:** The user wants to view artist bookmarks.

**Preconditions:** The user has already bookmarked at least one artist. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the Artists hyperlink.

**Additional non-functional requirements:** 
 - The table displayed has the following columns: Artist Name, Number of Torrent Groups
 
 
#### 2.5 Sorting All Bookmarked Artist Rows 

**Primary Actor:** Any user.

**Brief:** Allows the user to sort the rows of a bookmark collection based on different fields.

**Trigger:** The user wants to sort by Artist Name, or Number of Torrent Groups.

**Preconditions:** The user has already bookmarked at least two artists. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page for artists.
 2. The user clicks on the column title.

**Additional functional requirements:**
 - If a column is not currently being used for sorting all other column sorts are removed and 
 it is the table is sorted in descending order by that column.
 - If the column is currently used for descending order, the order is now set to 
 ascending order for that column.
 - If the column is currently used for ascending order, the order is now set to 
 descending order for that column.
 
**Additional non-functional requirements:** 
 - The table order should be sorted based on the user selection and logic above. 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 