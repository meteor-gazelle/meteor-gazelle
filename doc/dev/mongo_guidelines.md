Mongo standards
---------------
* Collection naming
  * camelCase collection names to coincide with Meteor style guidelines for identifiers.
  * Collection names should not start with special characters, such as an underscore. Doing so will introduce problems when interacting with the collection via the MongoDB shell.
  * Make plural as a collection contains a multitude of instances of the object being described.
  * No word separators should be used as collection names should be short and direct.
* Field naming
  * camelCase field names to coincide with Meteor style guidelines for identifiers.
  * Make plural field names if the field being stored represents an array of items; otherwise, make the field name singular.
  * No word separators should be used as field names should be short and direct.
