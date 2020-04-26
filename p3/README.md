# Project 3
* By: Andrew Bielecki
* Production URL: 
* API Test URL: <https://e28-api.andrewbielecki.com/api/health-check>
## Outside resources
* [Beer Mug Favicon](https://favicon.io/emoji-favicons/beer-mug/)
* [Beer Logo](http://pngimg.com/download/2383)
* [Beer Banner](https://commons.wikimedia.org/wiki/File:Beer_banner.jpg)
* [Import CSS Frameworks in Vue](https://alligator.io/vuejs/css-frameworks-vuejs/)
* [Bulma](https://bulma.io)
* [Vue Bulma Datepicker](https://github.com/vue-bulma/datepicker)
* [Moment Timezone](https://momentjs.com/timezone/)
* [Accounting JS](http://openexchangerates.github.io/accounting.js/)
* [CKEditor Vue Component](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html)
* [Vue Truncate Filter](https://forum.vuejs.org/t/truncate-filter-with-html/50023)
* [JS Truncate Words Function](https://www.w3resource.com/javascript-exercises/javascript-string-exercise-24.php)
* [Alcohol By Volume Calculation](http://www.brewunited.com/abv_calculator.php): Equation to calculate ABV
* [JS Debounce](https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2): Getting Debounce Working
* [SO Vue Global Functions](https://stackoverflow.com/questions/42613061/vue-js-making-helper-functions-globally-available-to-single-file-components): 
Figured out I needed a Mixin
* [Vue Plugin](https://alligator.io/vuejs/creating-custom-plugins/): Wanted to extract API calls to a pseudo-service

## Notes for instructor
* API is live (written in Laravel - shocking, right?) - it's a mess as I have been playing with multiple test
projects. <https://github.com/ambielecki/e28-api>
* Should probably abstract a bunch of this to services
* Auth is mostly setup but being ignored (haven't implemented registration / signin), still using JWT to allow create 
to work
* Beer journal flow - go to /journal -> expand a beer -> click View beer to get to /journal/id -> click Edit Beer to
go to /journal/edit/{id} OR go to /journal -> click Add Entry to go to /journal/create
* No client side form validation at this time (there is some server side built in, but it is basic)
* Passing some cobbled together global state
* Filters on journal list are not perfect nor complete, still can have some timing issues even with debounce
* List search filtering is just MySQL like statements, so, nothing fancy and will get slow
* Building on production with a Deployer script, so no assets in the repo