import { Hooks } from 'meteor/meteor-gazelle:hooks';

const Methods = {
  //TODO(ajax) How is this method different from a createUser method? Should it be made generic?
  registerUser: new ValidatedMethod({
    name: 'Accounts.methods.registerUser',
    // For the time being, Accounts.createUser handles the necessary validation
    validate: null,
    run({ email, username, password}) {
      let userId;

      // Run user creation code on the server
      if (!this.isSimulation) {
        // Create a user
        userId = Accounts.createUser({email, username, password});
        // If a user has been created
        if (userId) {
          // Run registered callbacks
          Hooks.run('userRegistered', { userId });
        }
      }

      return userId;

      /*
       debugger;
       if (this.isSimulation) {
       Accounts.createUser({email: email, username: username, password: password}, function(err) {
       if (err) {
       debugger;
       //throw new Meteor.Error('')
       }
       });
       userId = Meteor.userId();
       } else {
       console.log("server");
       //userId = Accounts.createUser({email, username, password});
       }

       // Server code
       if (!this.isSimulation) {
       console.log(userId);
       console.log("Server side");
       }

       return userId;
       }
       */
    }
  })
};

export { Methods };
