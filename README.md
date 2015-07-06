Testing Stuff
--------------

Meteor has realtime "reactive" tests. This means things tests are supposed to rerun whenever you save a change. Annoyingly, this is broken for server integration tests. Working on it, but basically `meteor --test` is a currently functional, though annoyingly slow, way to run all tests.

Also double-check your [testing nomenclature](http://www.meteortesting.com/chapter/velocity) when writing tests, because meteor's test infrastructure is fairly granular.



SASS Mixins
-----------

The following SASS mixins are available for use in SASS stylesheets.

| Mixin |

* `no-content`: Shorthand for `content: ''`. Used in `:before` & `:after` pseudo classes.

* `arrow-up ($color, $width, [$height])`: Creates a solid triangle pointing up.
  * `$color`: Color of the arrow.
  * `$width`: Width of the arrow.
  * `$height` *(optional)*: Height of the arrow. Defaults to the same value as `$width`.

* `slide-down`: Animation to slide an element in.

* `slide-up`: Animation to slide an element out.

* `dropdown-menu ([$arrow-x, $arrow-from])`: Commmon styles for a dropdown menu
  * `$arrow-x` *(optional)*: Horizontal position of arrow in dropdown. Default value is `50%`.
  * `$arrow-from` *(optional)*: Position to offset arrow from. Valid values are `left` and `right`. Default value is `left`.


* `dropdown-menu-item`: Common styles for list items in a dropdown menu.

* `icon ($content)`: A font-awesome icon.
  * `$content`: The icon character. Usually a `$fa-var-` variable. See [font-awesome-sass variables](https://github.com/FortAwesome/font-awesome-sass/blob/master/assets/stylesheets/font-awesome/_variables.scss).

* `main-container`: Shared styles for the main content container.
