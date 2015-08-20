# Tagging - Technical Specifications

## Preface

The tagging system is part of the core of meteor-gazelle. Tagging allows users to add labels
to their items, simplifying the way different sections of the site are searched. It allows
for more fine-graned queries, limiting results to the desired item set.

## Class Implementation

* Class: TagManager - Attached to individual items (threads, wiki articles, etc.)
  * First constructor will create a simple tagging instance, accepting the following
    parameters:
    * The item name (i.e. thread, wiki article), used for schema
    * The tag editing permission name. This will vary based on the system utilizing
      tagging
    * A boolean indicating if tagging is required or optional
    * A pre-defined tag list, or null to use the global tag list
    * A lower tag limit (-1 for no limit)
    * An upper tag limit (-1 for no limit)
    * A boolean indicating if voting is enabled or disabled (true for enabled, false for disabled)
  * Second constructor will create a heirarchal tagging instance, accepting the following
    parameters:
    * The item name (i.e. thread, wiki article), used for schema
    * The tag editing permission name. This will vary based on the system utilizing
      tagging
    * A boolean indicating if parent tags are required or optional
    * A boolean indicating if child tags are required or optional
    * A boolean indicating if parent tags must be chosen before child tags
    * A pre-defined parent tag list, or null to use the global tag list
    * A pre-defined child tag list, or null to use the global tag list
    * The lower parent tag limit (-1 for no limit)
    * The upper parent tag limit (-1 for no limit)
    * The lower child tag limit (-1 for no limit)
    * The upper child tag limit (-1 for no limit)
    * A boolean indicating if voting is enabled or disabled (true for enabled, false for disabled)
  * All parameters must be stored as local data for reuse in functions.
  * Function: addTag(item_id, tag_id) [simple]
    * Lookup tag name, and insert the data into %item%_tags if not blacklisted
  * Function: addTag(item_id, tag_id, parent_tag) [heirarchal]
    * parent_tag: bool, indicating if the tag is a parent tag
    * Lookup tag name, and insert the data into %item%_tags if not blacklisted
  * Function: removeTag(item_id, tag_id) [both]
    * Remove corresponding row from %item%_tags
  * Function: upvoteTag(item_id, tag_id) [both]
    * Update %item%_tags corresponding row: votes = votes + 1
  * Function: downvoteTag(item_id, tag_id) [both]
    * Update %item%_tags corresponding row: votes = votes - 1
* Class: GlobalTagManager
  * Constructor takes no arguments.
  * Function: addTag(tag_name)
    * Add a tag to the global taglist
  * Function: removeTag(tag_id)
    * Remove a tag from the global taglist
  * Function: blacklistTag(tag_name)
    * Add a tag to the global blacklist
  * Function: removeTagFromBlacklist(tag_id)
    * Remove a tag from the global blacklist
  * Function: renameTag(tag_id, new_name, type)
    * Rename a tag
    * Type is a string (whitelist or blacklist), indicating if the tag is on the whitelist or blacklist

## Data Model

* %item%_tags:
    * %item%_id: int, the item ID (thread ID, wiki article ID, etc.)
    * tag: string, the tag name
    * tag_id: string, the tag ID
    * parent_tag: boolean, only created if heirarchal tagging is chosen. true if parent tag,
      false if child tag
    * votes: int, only created if voting is enabled. Contains the net number of votes
    * added_by: string, the ID of the user that added the tag
    * added_at: string, the timestamp of when the tag was added
* global_tags:
  * tag: string, the tag name
* tag_blacklist:
  * tag: string, the tag name

## REST API Endpoints

### Item Specific

* /%item%/:id/tags/add [POST]
  * Create a tag on an item
  * Data:
    * tag_id: int, the tag ID
    * parent_tag: boolean, if the tag is a parent tag (heirarchal tagging only)
* /%item%/:id/tags/:tag_id/remove [DELETE]
  * Delete a tag
  * Data: None
* /%item%/:id/tags [GET]
  * Get the taglist for an item
  * Data: None
* /%item%/:id/tags/:tag_id/upvote [PUT]
  * Upvote a tag
  * Data: None
* /%item%/:id/tags/:tag_id/downvote [PUT]
  * Downvote a tag
  * Data: None

### Global Tags

* /tags/add [POST]
  * Add a global tag
  * Data:
    * tag_name: string, the name of the tag
    * tag_type: string [whitelist, blacklist], if the tag should be added to the whitelist or blacklist
* /tags/:id/remove [DELETE]
  * Remove a tag from the whitelist or blacklist
  * Data:
    * type: string [whitelist, blacklist]: if the tag is on the whitelist or blacklist
* /tags/:id/rename [PUT]
  * Rename a tag
  * Data:
    * new_name: string, the new tag name
    * type: string [whitelist, blacklist]: if the tag is on the whitelist or blacklist
