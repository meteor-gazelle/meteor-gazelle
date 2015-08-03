# IP Tools

## Metadata

Author: Rhomes
Date: 7/15/2015

## Table of contents

1. Motivation
2. Business rules
3. Use cases
4. Data model

## Motivation

>The site has fostered a welcoming and helpful community while serving amazing content to our users. This community and data must be safeguarded and kept free of malicious attackers, rogue and unwelcome users who cannot follow the code of conduct. Control over who can access the site must be implemented to ensure the longevity of the beautiful community.

## Business rules

> * Users with the IP address who have exceeded a certain number of failed login attempts within a given time span must not be allowed to enter the site for a period of time.
> * Users with the IP address who have been permanantly banned must not be allowed to enter the site.
> * Site administrators with valid credentials and permissions must be able to modify banned IP address records.
> * Users who are are logged into the site when an administrator bans their IP address must have their session killed.

## Use cases

### 1.0 Failed login attempts are tracked

**Primary Actor:** A user

**Brief:** Ensures users who have failed to provide valid credentials to the site are tracked.

**Preconditions:** N/A

**Trigger:** Users enters invalid credentials to the log in form.

**Postconditions:**

* The failed log in attempt is recorded.
* Log in form displays information notifying user of failed log in attempt.

**Basic Flow:**

1. User enters invalid credentials.
2. User clicks log in.
3. Log in form displays information notifying user failed log in credentials.

**Functional Requirements:**

* Failed login attempt must be stored in the database with relevant information, such as amount of attempts, when the last failed attempt occurred, the IP address where the failed attempt originated, etc.

### 2.0 Banning IP address on exceeding login attempts

**Primary Actor:** A user

**Brief:** Ensures users who have failed to provide valid credentials to the site an arbitrary amount of times within one hour are banned for a configurable amount of time.

**Preconditions:** User has provided invalid credentials one less than the arbitrary amount within an hour.

**Trigger:** Users enters invalid credentials one more time within one hour of the most recent attempt.

**Postconditions:**

* The user is banned for a configurable amount of time.

**Basic Flow:**

1. User enters invalid credentials.
2. User clicks log in.
3. Log in form displays information notifying user of ban.

**Functional Requirements:**

* Banned IP addresses must be stored in the database with relevant information pertaining to the ban, such as related notes, who banned the IP address, and expiration date.

### 3.0 Banned IP addresses cannot gain access to site

**Primary Actor:** A user

**Brief:** Ensures connecting IP addresses cannot gain access to the site.

**Preconditions:** User is connecting to site from an IP address which has a corresponding banned IP record or falls within a range of banned IP addresses.

**Trigger:** Users enters credentials to website for login.

**Basic Flow:**

1. User enters credentials.
2. User clicks log in.
3. Log in form displays information notifying user of ban.

### 4.0 Connected users have session killed when their IP address is banned

**Primary Actor:** A user

**Brief:** Ensures users cannot continue to access site when they have connected before a ban has taken place.

**Preconditions:** User is connected to the site.

**Trigger:** 

* Another user connecting with the same IP address exceeds login attempts.
* Site administrator bans the IP address of the connected user.

**Postconditions:**

* The user has their session killed, they cannot navigate to any form of the site that requires logged in status.

**Basic Flow:**

1. User logs in.
2. Administrator bans the IP address or another user from behind the same IP address fails to provide valid log in credentials six consecutive times.
3. User is disconnected from site.

### 5.0 Site administrators can modify banned IP data

**Primary Actor:** A site administrator

**Brief:** Ensures adminsitrators can CRUD banned IP addresses.

**Preconditions:** User has site administrator and IP banning privileges.

**Trigger:** N/A

**Postconditions:**

* Banned IP data is created, updated or removed.

**Basic Flow:**

1. User with administrator and ip banning privileges navigates to the banned IP information form.
2. User modifies data.
3. Data is saved.

### 5.1 Site administrators can ban an IP address or range of IP addresses

**Primary Actor:** A site administrator

**Brief:** Ensures adminsitrators can ban an IP address or range of IP addresses.

**Preconditions:** User has site administrator and IP banning privileges.

**Trigger:** Administrator clicks the submit button on the form for a new banned IP address.

**Postconditions:**

* Banned IP record is created.

**Basic Flow:**

1. User with administrator and IP banning privileges navigates to the banned IP information form.
2. User enters relevant data in the form fields and clicks the submit button.
3. Data is saved.

**Functional Requirements:**

* Banned IP data is saved in the database.

### 5.2 Site administrators can update a banned IP record

**Primary Actor:** A site administrator

**Brief:** Ensures adminsitrators change the banned IP records within the database.

**Preconditions:** User has site administrator and IP banning privileges.

**Trigger:** Administrator changes an existing banned IP record.

**Postconditions:**

* Banned IP record is modified.

**Basic Flow:**

1. User with administrator and IP banning privileges navigates to the banned IP information form.
2. User changes relevant data for a banned IP record.
3. Data is saved.

**Functional Requirements:**

* Banned IP data is saved in the database.

### 5.3 Site administrators can remove a banned IP record

**Primary Actor:** A site administrator

**Brief:** Ensures adminsitrators can remove a banned IP record from the database.

**Preconditions:** User has site administrator and IP banning privileges.

**Trigger:** Administrator clicks the delete button for an existing banned IP record.

**Postconditions:**

* Banned IP record is removed.

**Basic Flow:**

1. User with administrator and IP banning privileges navigates to the banned IP information form.
2. User clicks the delete button for a banned IP record.
3. Data is removed.

**Functional Requirements:**

* Banned IP data is removed from the database.

## Data model

**Login Attempts:**
> * The long data type format of the IP address where the failed login attempt originated from.
> * The string data type format of the IP address where the failed login attempt originated from.
> * The integer data type of the amount of failed login attempts from the given IP address.
> * The date time data type of the most recent failed login attempt.
> * The date time data type of when the record was created.
> * The date time data type of when the record is to expire.

**Banned IPs:**
> * The long data type format of the IP address that is to be banned, or the beginning of the IP address range which is banned.
> * The string data type format of the IP address that is to be banned, or the beginning of the IP address range which is banned.
> * The long data type format of the end of the IP address range that is to be banned; optional.
> * The string data type format of the end of the IP address range that is to be banned; optional.
> * The string data type format of any relevant notes pertaining to the banned IP address.
> * The date time data type of when the banned IP record was created.
> * The string data type format of the user id which created the banned IP record.
> * The date time data type format of when the record is to expire.