# Permissions

## Table of contents

1. Motivation
2. Business rules
3. Use cases

## Motivation

The site requires certain pages and abilities to be limited to a sub set of users. A user can both be granted extra permissions and have certain permissions removed. A user typically gains extra permissions when transcending classes but can also be granted permissions explicitly. 

## Business rules

 - If a user lacks the permission to access a page then they must not be able to view it and taken to an error page.
 - If a user lacks the permission to perform a specific action they must not be able to perform it. 
 - Any change to a user's permissions from an administrative user must be logged in the user's log, indicating reason for the change and the permissions which were added or removed. 

## Use cases

### 1.0 Grant a user permission

**Primary Actor:** An administrator.

**Brief:**  A user can be granted additional permissions by an administrator so they could perform certain actions. 

**Trigger:** An administrator wants to grant a user an extra permission. 

**Preconditions:**

 - The user carries the permission for editing permissions. 

**Postconditions:** 

 - The extra permissions are granted.
 - The user's log is updated.

**Basic Flow:**

 1. The administrator navigates to a user's profile page.
 2. The administrator navigates to the user's permissions page.
 3. The administrator drags permissions from the user's enabled permissions to the user's enabled permissions. 
 4. The administrator saves the changes to the user's permissions. 

**Functional requirements:**

**Non Functional requirements:**

### 1.1 Remove a user permission

**Primary Actor:** An administrator.

**Brief:**  A user's permissions can be removed by an administrator so they could no longer perform certain actions. 

**Trigger:** An administrator wants to remove a permission from a user. 

**Preconditions:**

 - The user carries the permission for editing permissions. 

**Postconditions:** 

 - The permissions are removed.
 - The user's log is updated.

**Basic Flow:**

 1. The administrator navigates to a user's profile page.
 2. The administrator navigates to the user's permissions page.
 3. The administrator selects a permission and removes it. 
 4. The administrator saves the changes to the user's permissions. 

**Functional requirements:**

**Non Functional requirements:**

 - If a user has a permission which comes from a class, the class must be removed in order for the permission to be removed.
