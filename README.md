Gazelle
=======

[![Build Status](https://travis-ci.org/meteor-gazelle/meteor-gazelle.svg?branch=master)](https://travis-ci.org/meteor-gazelle/meteor-gazelle)

Gazelle is a web framework geared towards private BitTorrent trackers.
Gazelle is written in Javascript, using the Meteor framework.

_Note_: This version of Gazelle is under active development.

Contributing and Communications
-------------------------------
* The [Issues and Milestones](https://github.com/meteor-gazelle/meteor-gazelle/issues) contains items that need to be worked on. Check there for a general overview of what needs to be worked on.
* IRC
  * &#35;gazelle on irc.what-network.net is the official meteor-gazelle development channel.
  * If you are looking for something to work on, ping the Core team using !core <message>.
* For questions and discussions related to the project, new issues may be opened (using the appropriate labels).
* [Trello](https://trello.com/b/XXzk9boI/meteor-gazelle) is used for high-level project planning. It is used by the Core team to plan out upcoming ideas and features.

Submitting a pull request
-------------------------
* [Fork](https://github.com/meteor-gazelle/meteor-gazelle/fork) the repository, and switch to a new branch using `git checkout -b <branch_name>`.
* Make your changes, and submit a [new pull request](https://github.com/meteor-gazelle/meteor-gazelle/compare). Be detailed in the pull request's description.
  * Be sure to select the appropriate labels/milestones for your pull request.
  * If your pull request applies to an issue, be sure to mention it in the description.
* The new pull request will be broadcasted in #gazelle, and the Core team will review it and leave feedback.

Coding Standards
----------------
* All JavaScript code follows the [Meteor style guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide).
* All CSS code complies to [BEM](http://getbem.com/) standards.
* All MongoDB styles follow the [Mongo Guidelines](https://github.com/meteor-gazelle/meteor-gazelle/blob/master/doc/dev/mongo_guidelines.md).

Dependencies
------------
* [Meteor](https://www.meteor.com/)

Installation
------------
After [installing Meteor](https://www.meteor.com/install), clone this repository, create a settings.json file based off of the settings template and run `meteor run --settings settings.json`.

[Vagrant](https://github.com/meteor-gazelle/vagrant) allows for a simple installation for a clean development environment. The readme provides detailed instructions for how to set it up. Vagrant is good if you'd like to run meteor-gazelle in a Debian environment.

Running tests
------------
    # one-time setup
    curl https://install.meteor.com | /bin/sh
    npm install -g velocity-cli eslint
    gem install scss-lint
    export PATH="$HOME/.meteor:$PATH"
    cp settings.json.template settings.json

    # actually run tests
    ./run_tests.sh

    # optionally, just unit tests
    ./run_tests.sh -t
    # optionally, just lint
    ./run_tests.sh -l
    # (optional) install git hook to automatically run test suite before pushing to remote.
    cd scripts/ && ./install_git_hooks.sh
