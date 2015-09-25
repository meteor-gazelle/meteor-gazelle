## meteor-behaviors
### About
This provides various collection behaviors for any Mongo collection within a Meteor application.

### Usage
To assign a behavior simply pass the Mongo collection and the field to the ```Behavior``` object to apply the desired behavior.
#### createdAt
Applies a timestamp behavior that will assign the current date before a record is inserted.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.createdAt(Collection, 'createdAt');
```

#### updatedAt
Applies a timestamp behavior that will assign the current date before the record is updated.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.updatedAt(Collection, 'updatedAt');
```

#### createdBy
Applies a behavior that will assign the current user id before a record is inserted.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.createdBy(Collection, 'createdBy');
```

#### updatedBy
Applies a timestamp behavior that will assign the current user id before the record is updated.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.updatedBy(Collection, 'updatedBy');
```

#### updateAtHistory
Applies a timestamp behavior that will push the current date to a list before the record is updated.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.updateAtHistory(Collection, 'updateAtHistory');
```

#### updateByHistory
Applies a behaviors that will push the current user id to a list before the record is updated.

```javascript
var Collection = new Mongo.Collection('SomeCollection');
Behaviors.updateByHistory(Collection, 'updateByHistory');
```
