# Project 1
* By: Andrew Bielecki
* Production URL: <https://e28p1.andrewbielecki.com>

## Outside resources
* [Bulma](https://bulma.io/) - JS free CSS framework
* [CSS Tricks: Sticky Footer](https://css-tricks.com/couple-takes-sticky-footer/) - always forget how to do this
* [Playing cards in Unicode](https://en.wikipedia.org/wiki/Playing_cards_in_Unicode) - easier than images
* [SO: Unescaped HTML In Vue](https://stackoverflow.com/questions/30877491/display-unescaped-html-in-vue-js) - 
to show the suit ascii
* [Reset a component](https://github.com/vuejs/vue/issues/702) - an approach to reseting to original state
* [Component lists should have keys](https://stackoverflow.com/questions/42476942/console-warning-component-lists-rendered-with-v-for-should-have-explicit-keys) - 
get rid of annoying message
* [JSdoc Return Object](https://stackoverflow.com/questions/28763257/jsdoc-return-object-structure) - 
Define object properties in JSDoc
* [Deployer](https://deployer.org/) - not really part of the project, but decided to use this to push to DO (fewer 
dependencies than Capistrano since I already have PHP in my local environment)

## Notes for instructor
* You can easily cheat, the dealer's hole card is set to start 
(so we can see if the dealer had blackjack).  You'd need a server side API to really hide it.
* Dynamic styling can be seen via the cards' show_card property (shows the blue back or white face as background), also, 
the messages have different classes depending on the situation, card text color is also controlled via a class
* Audit is not something one would show on a front-end, but good to show the workings of a project, 
in the audit, purse is what is returned to the player (0 on a loss, their bet on a push, bet + winnings on a win)
* A blast from the past may be found at <https://e15-p2.andrewbielecki.com>, I had put it up to show 
someone at work :)