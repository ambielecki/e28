# Project 3
* By: Andrew Bielecki
* Production URL: <http://e28p3.andrewbielecki.com>
* API Test URL: <https://e28-api-2.andrewbielecki.com/api/health-check>
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
* [SO Vue Router Duplication Error](https://stackoverflow.com/questions/57837758/navigationduplicated-navigating-to-current-location-search-is-not-allowed)
* [Vue Plugin](https://alligator.io/vuejs/creating-custom-plugins/): Wanted to extract API calls to a pseudo-service
* [Vue Router Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks)
* [Testing Computed](https://lmiller1990.github.io/vue-testing-handbook/computed-properties.html#testing-by-rendering-the-value)
* [Check that element does not exist in Cypress](https://stackoverflow.com/questions/48915773/cypress-test-if-element-does-not-exist)
* [Cypress Testing CKEditor](https://medium.com/@nickdenardis/getting-cypress-js-to-interact-with-ckeditor-f46eec01132f): 
Modified a bit to put the selector on the encapsulating field div

## Notes for instructor
#### Setup
You will need to copy ./p3/example.env to ./p3/.env  This will set the app api to use the production version, 
which has been opened to accept http://localhost:*  Please let me know if you will be using a different domain 
and I will open up the CORS policy

#### Test User
* Email: __testy@test.com__
* Password: __foobarfizzbuzz__

This user's ability to change their password is locked down at the API level.

#### Other Notes
* API is live (written in Laravel - shocking, right?) - it's a mess as I have been playing with multiple test
projects. <https://github.com/ambielecki/e28-api>
* Beer journal flow - go to /journal -> expand a beer -> click View beer to get to /journal/id -> click Edit Beer to
go to /journal/edit/{id} OR go to /journal -> click Add Entry to go to /journal/create
* Filters on journal list are not perfect nor complete, still can have some timing issues even with debounce
* List search filtering is just MySQL like statements, so, nothing fancy and will get slow
* No test for changing password, I am using the same test user live and for testing, so don't want to break anything. 
In real deployment I would test that and have additional test users (also didn't want to get too crazy setting env 
variables if you plan on testing locally).