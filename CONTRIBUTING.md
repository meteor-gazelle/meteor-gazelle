Contributing to meteor-gazelle
==============================

Be sure all code written follows the [Meteor style guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide), and has the appropriate test methods.

Specifications can be found in the [doc/specs](doc/specs) subdirectory.

Communication
-------------
* The [Issues and Milestones](https://github.com/meteor-gazelle/meteor-gazelle/issues) contains items that need to be worked on. Check there for a general overview of what needs to be worked on.
* IRC
  * &#35;gazelle on irc.what-network.net is the official meteor-gazelle development channel.
  * If you are looking for something to work on, ping the Core team using !core <message>.
* For questions and discussions related to the project, new issues may be opened (using the appropriate labels).
* [Trello](https://trello.com/b/XXzk9boI/meteor-gazelle) is used for high-level project planning. It is used by the Core team to plan out upcoming ideas and features.

Branch Naming
-------------
* For features: `feature/<feature_name>`
* For documentation: `doc/<document_name>`
* For bug fixes: `bugfix/<issue_id>`

Submitting a pull request
-------------------------
* [Fork](https://github.com/meteor-gazelle/meteor-gazelle/fork) the repository, and switch to a new branch using `git checkout -b <branch_name>`.
* Make your changes, and submit a [new pull request](https://github.com/meteor-gazelle/meteor-gazelle/compare). Be detailed in the pull request's description.
  * Be sure to select the appropriate labels/milestones for your pull request.
  * If your pull request applies to an issue, be sure to mention it in the description.
* The new pull request will be broadcasted in #gazelle, and the Core team will review it and leave feedback.

Privacy Considerations
----------------------

You might not want to have your real name linked with this project. Here we provide some hints that should help contributing under a pseudonym.

* If you want to participate in the discussion, create pull requests, or edit the wiki, consider creating a separate GitHub user account. We cannot delete any pull requests or issues made in the bug tracker.
* If you're using git for other projects as well, check if commits you make on this project use your real name. GitHub uses the email address in commit to associate them to your account. The relevant configuration options are listed below. The used email address does not need to be real. If you need to fix commits you've already made, see `git commit --amend --reset-author`.
```
git config --local user.name
git config --local user.email
git config --local user.signingkey
```
* Consider using a VPN or [Tor](https://torproject.org) for additional anonimity. Don't forget to proxy any `git` operations as well.
 * Using proxies might cause GitHub to ban your account for a little while because they suspect abuse. Contacting support usually resolves this in a couple of days.
