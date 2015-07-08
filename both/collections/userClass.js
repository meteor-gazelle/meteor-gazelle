UserClass = new Mongo.Collection('userClass');
UserClass.attachSchema(Schemas.userClass);

Class = new Mongo.Collection('class');
Class.attachSchema(Schemas.class);
//UserClass.timestampable();
//UserClass.createdBy();

