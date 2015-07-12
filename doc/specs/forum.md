
## Table of contents

1. Motivation
1. Business rules
1. Use cases
1. Data model

## Motivation

Provides a means for users of the site to communicate with each other in a typical forum fashion.


## Business rules

* User's are associated with an avatar
* User input/output interaction time stamps are logged, (thread creation time, forum post time, edit time, etc)
* Access to content and actions can be controlled via permission settings

## Use cases

### 1.0. Forum manager

**Primary Actor:** A staff member who is managing the forum.

**Brief:** Allows a user to mange the forum. Create forum sections, individual forums, modify the permissions on the forum, and so on.

**Trigger:** The user needs to manage the forum.

**Preconditions:** The user carries the forum management permission.
**Postconditions:** The forums are updated.

**Basic Flow:**

 1. The user navigates to the forum management page.
 2. The user creates a forum section.
 3. The user add a forum to the forum section.

**Functional requirements:**

 - Sections and forums can be edited or deleted
 - A forum section cannot be deleted if it contains forums

### 1.1. Manage forum permissions

**Primary Actor:** A staff member who is managing the forum.

**Brief:** The permissions on a forum can be set to restrict a forum's access to a subset of specific users or classes.

**Trigger:** The user goes to manage the forum and sets the forum permissions.

**Preconditions:** The user carries the forum management permission.

**Postconditions** The forum permissions are updated.

**Basic Flow:**

 1. The user navigates to the forum management page.
 2. The user selects a forum.
 3. The user adds a updates a set of permissions on the forum.

**Additional functional requirements:**

  - Access to a forum can be set by user ids, user classes, or a combination of the two.
  - When viewing the forum, forums that a user does not have access to are not visible.


### 1.2. Manage thread permissions

**Primary Actor:** A staff member who is managing the forum.

**Brief:** The permissions on a thread can be set so it is not visible to certain users.

**Trigger:** The users goes to a thread to manage its permissions.

**Preconditions:** The user carries the forum management permission.

**Basic Flow:**

 1. The user navigates to a thread.
 2. The user views the thread management tools.
 3. The user adds a set of user ids that should not have access to the thread.


**Additional functional requirements:**

 - When viewing a forum only threads that a user has access to are visible.


### 2.0. View the forums

**Primary Actor:** A user.

**Brief:** All the forums and the sections they belong to can be viewed. This is considered the "main" forum page.

**Trigger:** A user views the forums page to get an overview of the forums on the site.

**Preconditions:** The user does not have the forum viewing permission disabled.

**Postconditions:** The forums are displayed

**Basic Flow:**

 1. The user navigates to the forum page

**Additional functional requirements:**

 - The forum title, description, latest post in a thread, total number of posts and total number of threads is displayed.
 - Only forums which the user has access to are displayed.


 **Implementation notes:**

 - Consider the scenario when the latest thread post in a forum display (when viewing the forums page) is a thread that the user does not have access to.


### 2.1. View a forum

**Primary Actor:** A user.

**Brief:** A forum shows the latest threads in the forum.

**Trigger:** A user goes to a forum to view its posts.

**Preconditions:**

 - The user does not have the forum viewing permission disabled.
 - The forum's permissions allow the user to view this forum.

**Postconditions:**

**Basic Flow:**

 1. The user navigates to a forum.

**Additional functional requirements:**
 - The user can create a new thread in the forum if they have the necessary permissions.
 - The user can subscribe to a forum to be notified of new threads.
 - The user can jump to the last post they have read in the thread.
 - The user can report a thread.
 - The threads in a forum can be paged through.
 - The threads in a forum can be searched through.

 **Additional non functional requirements:**

 - The thread title, latest poster, author, latest post time, and thread creation time are displayed.
  - If the user accessing the forum has forum moderation or forum management permissions the number of reports a thread accumulated can be displayed. This will allow forum moderators to more quickly identify troublesome threads.
 - Only threads to which the user has access to are visible.
 - The threads in a forum are ordered by sticky threads followed by threads with the latest post time in descending order.

### 2.2. View a forum thread

**Primary Actor:** A user.

**Brief:** A forum thread is a collection of posts pertaining to a certain topic. A user can read through a thread and post in it adding to the conversation.

**Trigger:** The user navigates to a forum thread.

**Preconditions:**

 - The user does not have the forum viewing permission disabled.
 - The forum's permissions allow the user to view forum in which the thread exists.
 - The thread's permissions allow the user to view this thread.

**Postconditions:** The user views the forum thread.

**Basic Flow:**

1. The user navigates to a forum thread.
2. The user is taken to their last read post in the thread.

**Additional functional requirements:**

 - The user can post in the thread if they have the necessary permissions.
 - The user can manage the thread if they have the necessary permissions.
 - The posts in a thread can be paged through.
 - The posts in a thread can be searched through.
 - The user can subscribe to a thread to be notified of new posts.

**Additional non functional requirements:**

 - The threads title and parent forum are displayed
 - The forum posts are ordered by their time of creation in descending order.
 - All the posts by the original poster in the thread are clearly indicated.
 - A post includes the post id, user's name, avatar, their user classes in short form, their custom title if they have one, and their donor status if they have one.


### 3.0 Create a thread in the forum

**Primary Actor:** A user.

**Brief:** New threads can be created in a forum.

**Trigger:** A user wants to create a new thread in the forum.

**Preconditions:**

 - The user does not have the thread creation disabled.
 - The user has access to the forum they are posting the thread in.

**Postconditions:**

 - The thread is created.
 - The user is taken to the newly created thread.
 - The latest thread post is updated in the forum.
 - The total number of threads and posts in the forum is incremented.
 - The subscribers to the forum are updated that a new thread has been created.

**Basic Flow:**

1. The user navigates to a forum.
2. The user presses the thread creation button.
3. The user fills out the thread form.
4. The user submits the form.

**Additional functional requirements:**

**Additional non functional requirements:**

 - When the user creates a thread, the "body" of the thread becomes the first post in a thread.


### 3.1 Post in a thread

**Primary Actor:** A user.

**Brief:** Posts can be created by users in a thread to add to the conversation.

**Trigger:** The user submits a post to a thread.

**Preconditions:**

 - The user does not have their posting permissions disabled.
 - The user has access to the thread and forum.
 - The user is not the latest poster in the thread.
 - The thread is not locked.
 - The user can always post in the thread if they carry the forum moderation or forum management permission.

**Postconditions:**

 - A post is created in the thread.
 - Subscribers to the thread are notified that a their is a new post.
 - The total number of posts the thread and forum are incremented.

**Basic Flow:**

 - The user navigates to a forum thread.
 - The user fills out the new post form.
 - The user submits the new post.
 - The new post is added to the thread.

**Additional functional requirements:**

 - If the user is a forum moderator or forum manager they can optionally mark their post as "important". Posts marked as "important" will be clearly highlighted when reading a forum thread. This is in order to draw more attention to them, for example if it is a general warning to the users posting in the thread.

**Additional non functional requirements:**

### 4.0 Rename a forum thread

**Primary Actor:** A forum moderator.

**Brief:** Sometimes threads are incorrectly named or need to be more aptly named, forum moderators have the ability to do this.

**Trigger:** A forum moderator opens a thread to rename it.

**Preconditions:**

 - The user has the forum moderation or forum management permissions.

**Postconditions:**

 - The thread is renamed.

**Basic Flow:**

1. The user opens a thread.
2. The user opens the thread management tools.
3. The user renames the thread.

**Additional functional requirements:**

**Additional non functional requirements:**


### 4.1 Move a forum thread

**Primary Actor:** A forum moderator.

**Brief:** Sometimes threads are placed in a the wrong and need to be moved, other times the thread is "trashed" and needs to be moved to the trash forum.

**Trigger:** A forum moderator opens a thread to move it to a different forum.

**Preconditions:**

 - The user has the forum moderation or forum management permissions.

**Postconditions:**

 - The thread is moved.
 - The number of thread count is incremented and decremented in the respective forums.

**Basic Flow:**

 1. The user opens a thread.
 2. The user opens the thread management tools.
 3. The user selects the forum to which the thread should be moved.

**Additional functional requirements:**

**Additional non functional requirements:**

 - When a thread is moved to the trash forum it should be locked.
 - If a thread is moved to a forum that a subscribed user does not have access to than the user should no longer notifications from their thread subscription.

 ### 4.2 Delete a forum thread.

**Primary Actor:** A forum manager.

**Brief:** Threads are rarely deleted but sometimes they need to be, only forum managers can delete a thread.

**Trigger:** A forum manager opens a thread in order to delete it.

**Preconditions:**

 - The user has the forum management permissions.

**Postconditions:**

 - The thread is deleted.
 - All posts in the thread are deleted.
 - Users are unsubscribed from the thread.
 - The thread count in the forum is updated.

**Basic Flow:**

 1. The user opens a thread.
 2. The user opens the thread management tools.
 3. The user presses the delete button.
 4. The user confirms that they want to delete the thread.

 ### 4.3 Lock a forum thread.

**Primary Actor:** A forum moderator.

**Brief:** Threads can be optionally locked to prevent users from posting in them.

**Trigger:** A forum moderator opens a thread in order to lock it.

**Preconditions:**

 - The user has the forum moderator or forum management permissions.

**Postconditions:**

 - The thread is locked.

**Basic Flow:**

 1. The user opens a thread.
 2. The user opens the thread management tools.
 3. The user locks the thread.

 ### 4.4 Sticky a forum thread.

**Primary Actor:** A forum moderator.

**Brief:** In order to draw more attention to a forum thread, the forum thread can be made "sticky" which will cause it to show up at the top of the list when viewing the threads in a forum.

**Trigger:** A forum moderator opens a thread in order to sticky it.

**Preconditions:**

 - The user has the forum moderator or forum management permissions.

**Postconditions:**

 - The thread is stickied.
 - The thread is moved to the top of the thread list in a forum.

**Basic Flow:**

 - The user opens a thread.
 - The user opens the thread management tools.
 - The user marks the thread as "sticky" the thread.

**Additional functional requirements:**

 - When marking a thread as "sticky" a ranking can be assigned to it in order to customize in which order the sticky thread appears in relation to other sticky threads when viewing a forum.

### 5.0 Edit a post.

**Primary Actor:** A user.

**Brief:** After a post has been created a user should be able to edit the post's contents. A user can only edit their own posts unless they are a forum moderator or forum manager.

**Trigger:** The user opens a thread and navigates to their post in order to edit it.

**Preconditions:**

 - The user has access to the thread and forum.
 - The user is editing their own post.
 - If the user is a forum moderator they can edit anybody's post except those made by forum managers.
 - If a user is a forum manager they can edit anybody's post.

**Postconditions:**

 - The post is edited.
 - The post's edit history is updated.
 - The post's author is optionally alerted that their post has been edited.

**Basic Flow:**

 - The user navigates to a thread.
 - The user navigates to a post.
 - The user presses edit on a post.
 - The user submits the edited post.

**Additional functional requirements:**

 - If the user editing a post is a forum moderator or forum manager they can optionally alert the original author of the post that their post has been edited when the edit is submitted.

**Additional non functional requirements:**

 - When a post is edited the previous version is saved in an edit history which can be viewed by forum moderators or forum managers.
