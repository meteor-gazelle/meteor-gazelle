# Site news - Announcements and Blog 

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

Users are notified of site news through either on site announcements or blog posts. Announcements and blog posts are created by users having each respective permissions. When an announcement or blog post is created the users on site are notified of the post. Users can view the announcements and blogs in a dedicated site news page. Blog posts have the option of being published to only a subset of users specified by class. 

## Business rules

 - An announcement or blog post must have a title and a body. 
 - Only users carrying the announcement management permission can manage announcements.
 - Only users carrying the blog management permission can manage blogs.  
 - Users are only notified of only blogs which they have the permission to view. 
 - 
## Use cases

### 1.0 Create an announcement.

**Actor:** A user who manages the announcements. 

**Brief:**  Announcements are created in order to notify the user base of site news. 

**Trigger:** The actor wants to create an announcement. 

**Preconditions:**

 - The actor carries the announcement management permissions. 

**Postconditions:** 

 - The announcement is created. 
 - Users are notified of the announcement. 

**Basic Flow:**

 - The actor creates to the site news page. 
 - The actor navigates the management tools. 
 - The actor presses fills out a form to create an announcement.
 - The actor submits the form and the announcement is created.  

**Functional requirements:**

 - When creating an announcement the actor can choose to automatically create a thread in a given forum having to fill out a thread creation form for the thread title and body.


### 1.1 Edit an announcement.

**Actor:** A user who manages the announcements. 

**Brief:**  Sometimes announcements need to be edited. 

**Trigger:** The actor wants to edit an announcement. 

**Preconditions:**

 - The actor carries the announcement management permission.

**Postconditions:** 

 - The announcement is edited. 

**Basic Flow:**

 1. The actor navigates to the site news page. 
 2. The actor selects an announcement. 
 3. The actor edits the announcement.
 4. The actor saves the announcement. 

### 1.2 Delete an announcement.

**Actor:** A user who manages the announcements. 

**Brief:**  Sometimes announcements need to be deleted. 

**Trigger:** The actor wants to delete an announcement. 

**Preconditions:**

 - The actor carries the announcement management permission.

**Postconditions:** 

 - The announcement is deleted. 
 - If the announcement is currently in a user's pending notifications it is removed so the user does not see it. 

**Basic Flow:**

 1. The actor navigates to the site news page. 
 2. The actor selects an announcement. 
 3. The actor deletes the announcement.

### 2.0 Create a blog post.

**Actor:** A user who manages the blog. 

**Brief:**  Blog posts are created in order to notify of site news which isn't as important as an announcement or targets a subset of users. 

**Trigger:** The actor wants to create a blog post. 

**Preconditions:**

 - The actor carries the blog management permissions. 

**Postconditions:** 

 - The blog post is created. 
 - Users are notified of the blog post. 

**Basic Flow:**

 - The actor navigates to the site news page. 
 - The actor navigates the management tools. 
 - The actor presses fills out a form to create a blog post. 
 - The actor submits the form and the blog is created.  

**Functional requirements:**

 - When creating a blog the actor can choose to automatically create a thread in a given forum having to fill out a thread creation form for the thread title and body.
 - When creating a blog the actor can optionally specify to only publish the blog post to certain user classes. 


### 2.1 Edit a blog post.

**Actor:** A user who manages the blog. 

**Brief:**  Sometimes blog posts need to be edited. 

**Trigger:** The actor wants to edit a blog post. 

**Preconditions:**

 - The actor carries the announcement management permission.

**Postconditions:** 

 - The announcement is edited. 

**Basic Flow:**

 1. The actor navigates to the site news page. 
 2. The actor selects a blog post. 
 3. The actor edits the blog post.
 4. The actor saves the blog post. 

### 2.2 Delete a blog post.

**Actor:** A user who manages the blog. 

**Brief:**  Sometimes blogs need to be deleted. 

**Trigger:** The actor wants to delete a blog. 

**Preconditions:**

 - The actor carries the blog management permission.

**Postconditions:** 

 - The blog is deleted. 
 - If the blog is currently in a user's pending notifications it is removed so the user does not see it. 

**Basic Flow:**

 1. The actor navigates to the site news page. 
 2. The actor selects a blog. 
 3. The actor deletes the blog.

### 3.0 View the site news

**Actor:** A user.

**Brief:**  Sometimes blogs need to be deleted. 

**Trigger:** The actor wants to view the site news. 

**Postconditions:** 

 - The actor views the site news.

**Basic Flow:**

 - The actor navigates to the site news page. 
 
 **Functional requirements:**

 - If the actor carries the announcement or blog management permissions they can view and perform the relevant actions.
 - The site news can be searched.
 - The site news can be sorted. 
 
 **Non functional requirements:**

 - The site news clearly states how many announcements and blogs there are. Blog counts are broken up by class that they belong to. 
 - If a forum thread is associated with an announcement it can be navigated to. 

### 4.0 Receive an announcement

**Actor:** A user.

**Brief:**  When an announcement is created users need to be clearly notified of the newly created announcement. 

**Trigger:** An announcement is created.

**Preconditions:**

 - The actor is signed into the site. 

**Postconditions:** 

 - The actor receives the announcement.

**Actor returns from inactivity Flow:**

 - Announcement is created.
 - The actor returns from inactivity, in other words they open the site up in their browser.
 - A modal is shown displaying the announcement title, body and time of creation and author. 
 
 **Actor is active on the site Flow:**

 - Announcement is created. 
 - If actor is active on the site when the announcement is created they receive a notification. 

 **Functional requirements:**

 - Actors can mark announcements as read. 
