# Project 2
+ By: Andrew Bielecki
+ Production URL: <https://e28p2.andrewbielecki.com>
+ API Test URL: <https://e28-api.andrewbielecki.com/api/health-check>

## Pages summary
* / - Home page, all hardcoded
* /journal - List of brewing journal entries (filterable)
* /journal/{id} - Journal Entry details
* /journal/create - Add a journal entry
* /journal/edit/{id} = Edit a journal entry
* /tools - Brewer helper tool page (barebones at the moment)

## SFC summary
* /src/assets/components/BeerHome.vue - homepage
* /src/assets/components/BeerTools.vue - tools page shell
* /src/assets/components/tools/BeerAlcoholCalculator.vue - ABV calculator widget
* /src/assets/components/journal/BeerJournalList.vue - List of journal entries
* /src/assets/components/journal/BeerJournalView.vue - View a specific entry
* /src/assets/components/journal/BeerJournalCreate.vue - Create journal shell
* /src/assets/components/journal/BeerJournalEdit.vue - Edit journal shell
* /src/assets/components/journal/BeerJournalForm.vue - Shared form for journal entry create/edit

## Server interaction
* Mock login / JWT refresh for a test account (automatic from main.js load)
* Journal list retrieves entries from API
* Journal list can filter entries with API call
* Create / Edit / View for Journal entries from API

## Outside resources
* [Beer Mug Favicon](https://favicon.io/emoji-favicons/beer-mug/)
* [Beer Logo](http://pngimg.com/download/2383)
* [Import CSS Frameworks in Vue](https://alligator.io/vuejs/css-frameworks-vuejs/)
* [Bulma](https://bulma.io)
* [Vue Bulma Datepicker](https://github.com/vue-bulma/datepicker)
* [Moment Timezone](https://momentjs.com/timezone/)
* [CKEditor Vue Component](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html)
* [Vue Truncate Filter](https://forum.vuejs.org/t/truncate-filter-with-html/50023)
* [JS Truncate Words Function](https://www.w3resource.com/javascript-exercises/javascript-string-exercise-24.php)
* [Alcohol By Volume Calculation](http://www.brewunited.com/abv_calculator.php)

## Notes for instructor
* API is live (written in Laravel - shocking, right?) - it's a mess as I have been playing with multiple test
projects. <https://github.com/ambielecki/e28-api>
* Should probably abstract a bunch of this to services
* Auth is mostly setup but being ignored (haven't implemented registration / signin)
* Beer journal flow - go to /journal -> expand a beer -> click View beer to get to /journal/id -> click Edit Beer to
go to /journal/edit/{id} OR got to /journal -> click Add Entry to go to /journal/create
* No client side form validation at this time (there is some server side built in, but it is basic)
* Passing some cobbled together global state
