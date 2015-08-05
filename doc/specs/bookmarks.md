# Bookmarks

## Table of contents

1. Motivation
1. Business rules
1. Use cases

## Motivation

Provide a system for users to bookmark torrent groups, artists, collages, 
or requests made on the website

## Business rules

* Users are able to bookmark a torrent group, artist, collage, or request.
* Users are able to remove bookmarks
* Users are able to sort bookmarks in ascending or descending order based on different fields.
* Users can receive notifications about certain bookmarks. 

## Use cases

### 1. Torrent Group Bookmarking

#### 1.0 Viewing All Bookmarked Torrent Groups

**Primary Actor:** Any user.

**Brief:** Allows the user to view their torrent group bookmarks.

**Trigger:** The user wants to view torrent group bookmarks.

**Preconditions:** The user has already bookmarked at least one torrent group. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the Torrents hyperlink.

**Additional non-functional requirements:** 
 - There is a cover art section. 
 - Each "row" for the torrent group should appear as it would on the artist page

 
#### 1.1 Adding a Torrent Group Bookmark

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
 
 
#### 1.2 Removing a Torrent Group Bookmark

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
 
 
#### 1.3 Managing Bookmarked Torrent Groups

**Primary Actor:** Any user.

**Brief:** Allows the user to manage the rankings of bookmarked torrent groups.

**Trigger:** The user wants to sort the bookmarked torrent groups based on personal ranking.

**Preconditions:** The user has already bookmarked at least one torrent group.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for Torrents.
 2. The user clicks "Manage Torrents".
 3. The user makes changes to bookmarked torrent group rankings and submits the changes.

**Additional functional requirements:** 
 - The ranking changes should be written to the database.
 - The user should be redirected to the bookmarked torrent groups page after the changes have saved.
 
 
#### 1.4 Remove Snatched Bookmarked Torrent Groups
 
**Primary Actor:** Any user.

**Brief:** Allows the user to remove all torrent groups that have already been snatched.

**Trigger:** The user wishes to prune their torrent group bookmark list of snatched torrents.

**Preconditions:** The user should have at least one Torrent Group bookmarked.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for torrent groups.
 2. The user clicks "Remove Snatched"

**Additional functional requirements:** 
 - The server should check each bookmark to see if the torrent has been snatched and remove bookmarks 
 of torrent groups that have been. 
 - The server should splice the rankings accordingly if bookmarks are removed. 

**Additional non-functional requirements:**
 - The displayed table should be updated to reflect the changes from the removal. 
 
 
#### 1.5 Setting a Note on a Torrent Group

**Primary Actor:** Any user.

**Brief:** Allows the user to set a personal note on the torrent group.

**Trigger:** The user wants to set a reminder/note to remember why a torrent group was bookmarked. 

**Preconditions:** The user must have already bookmarked the torrent group they want to make a note for.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for torrent groups.
 2. The user clicks "Set Note" for the respective torrent group.
 3. The user enters and submits a note.

**Additional non-functional requirements:**
 - The torrent group should show the note on hover in the main table. 
 
 

### 2. Artist Bookmarking

#### 2.0 Viewing All Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to view artist bookmarks.

**Trigger:** The user wants to view artist bookmarks.

**Preconditions:** The user has already bookmarked at least one artist. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the Artists hyperlink.

**Additional non-functional requirements:** 
 - The table displayed has the following columns: Artist Name, Number of Torrent Groups
 - The column for Artist Name should be hyperlinked to the appropriate artist page.
 

#### 2.1 Adding an Artist Bookmark

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
 
 
#### 2.2 Removing an Artist Bookmark

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
 
 
#### 2.3 Enabling Notifications for Bookmarked Artists

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

 
#### 2.4 Disabling Notification for Bookmarked Artists
 
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

 
### 3. Collage Bookmarking

#### 3.0 Viewing All Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to view collage bookmarks.

**Trigger:** The user wants to view collage bookmarks.

**Preconditions:** The user has already bookmarked at least one collage. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the Collage hyperlink.

**Additional non-functional requirements:** 
 - The table displayed has the following columns: Category, Collage, Torrents, Subscribers, Updated, Author
 - The Category, Collage, and Author columns should have fields that are hyperlinked to their respective pages.
 

#### 3.1 Adding a Collage Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to add a bookmark for a collage.

**Trigger:** The user wishes to bookmark a collage.

**Preconditions:** The user has not already bookmarked the collage

**Postconditions:** The collage is now bookmarked for that user

**Basic Flow:**

 1. The user navigates to the collage page.
 2. The user clicks the "Bookmark" hyperlink.
 3. The collage is bookmarked for that user.
 
**Additional functional requirements:**
 - The hyperlink function should also change to that of removing the bookmark

**Additional non-functional requirements:** 
 -  The hyperlink text is updated to "Remove Bookmark"
 
 
#### 3.2 Removing a Collage Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to remove a bookmark for a collage.

**Trigger:** The user wishes to remove the bookmark for a collage.

**Preconditions:** The user has already bookmarked the collage.

**Postconditions:** The collage is no longer bookmarked for that user.

**Basic Flow:** 

 1. The user navigates to the collage page.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The collage bookmark is removed.

**Additional functional requirements:** 
 - The hyperlink function should also change to that of adding a bookmark.

**Additional non-functional requirements:**
 - The hyperlink text is updated to "Bookmark" 
 
 **Alternate Flow:**
 
 1. The user has navigated to the Bookmarks page for Collages.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The collage bookmark is removed.
 
**Additional non-functional requirements:**
 - The collage row should be removed from the page. 
 
 
#### 3.3 Sorting All Bookmarked Collage Rows 

**Primary Actor:** Any user.

**Brief:** Allows the user to sort the rows of a bookmark collection based on different fields.

**Trigger:** The user wants to sort by Category, Collage Name, Number of Torrents, 
Subscribers, or Author Name

**Preconditions:** The user has already bookmarked at least two collages. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page for collages.
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
 
 
### 4. Request Bookmarking

#### 4.0 Viewing All Bookmarked Artists

**Primary Actor:** Any user.

**Brief:** Allows the user to view request bookmarks.

**Trigger:** The user wants to view request bookmarks.

**Preconditions:** The user has already bookmarked at least one request. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page.
 2. The user clicks on the request hyperlink.

**Additional non-functional requirements:** 
 - The table displayed has the following columns: Request Name/Year, Votes, Bounty, 
 Filled, Filled by, Requested by, Created, Last Vote
 - The Request Name/Year, Filled by, and Requested by columns should have fields that are hyperlinked to their respective pages.
 

#### 4.1 Adding a request Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to add a bookmark for a request.

**Trigger:** The user wishes to bookmark a request.

**Preconditions:** The user has not already bookmarked the request

**Postconditions:** The request is now bookmarked for that user

**Basic Flow:**

 1. The user navigates to the request page.
 2. The user clicks the "Bookmark" hyperlink.
 3. The request is bookmarked for that user.
 
**Additional functional requirements:**
 - The hyperlink function should also change to that of removing the bookmark

**Additional non-functional requirements:** 
 -  The hyperlink text is updated to "Remove Bookmark"
 
 
#### 4.2 Removing a request Bookmark

**Primary Actor:** Any user.

**Brief:** Allows a user to remove a bookmark for a request.

**Trigger:** The user wishes to remove the bookmark for a request.

**Preconditions:** The user has already bookmarked the request.

**Postconditions:** The request is no longer bookmarked for that user.

**Basic Flow:** 

 1. The user navigates to the request page.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The request bookmark is removed.

**Additional functional requirements:** 
 - The hyperlink function should also change to that of adding a bookmark.

**Additional non-functional requirements:**
 - The hyperlink text is updated to "Bookmark" 
 
 **Alternate Flow:**
 
 1. The user has navigated to the Bookmarks page for requests.
 2. The user clicks the "Remove Bookmark" hyperlink.
 3. The request bookmark is removed.
 
**Additional non-functional requirements:**
 - The request row should be removed from the page. 
 
 
#### 4.3 Sorting All Bookmarked Request Rows 

**Primary Actor:** Any user.

**Brief:** Allows the user to sort the rows of a bookmark collection based on different fields.

**Trigger:** The user wants to sort by Year, Votes, Bounty, Filled, Requested by, 
Created, or Last Vote

**Preconditions:** The user has already bookmarked at least two collages. 

**Basic Flow:**
 1. The user navigates to the Bookmarks page for collages.
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
 
 
#### 4.4 Remove Filled Bookmarked Requests
 
**Primary Actor:** Any user.

**Brief:** Allows the user to remove all requests that have already been filled.

**Trigger:** The user wishes to prune their torrent group bookmark list of filled requests.

**Preconditions:** The user should have at least one Request bookmarked.

**Basic Flow:** 

 1. The user navigates to the Bookmarks page for Requests.
 2. The user clicks "Remove Filled"

**Additional functional requirements:** 
 - The server should check each bookmark to see if the Request has been filled and remove bookmarks 
 of Requests that have been. 

**Additional non-functional requirements:**
 - The displayed table should be updated to reflect the changes from the removal. 
 
#### 4.5 Search Request Bookmarks

**Primary Actor:** Any user.

**Brief:** Allows the user to search through all bookmarked requests 
like they can on the requests page.

**Trigger:** The user wishes to find a request using some field like request type, name, etc.

**Preconditions:** There is at least one request bookmarked.

**Basic Flow:**

 1. The user navigates to the Bookmarks page for Requests
 2. The user sets their filter using the same search menu as that which is found
 on the requests landing page.
 3. The user clicks a search requests button.
 
**Additional functional requirements:**
 - The server should return a narrowed result set based on the filter
 
**Additional non-functional requirements:** 
 - The displayed table should reflect the above result set. 