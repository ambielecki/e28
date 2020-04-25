/**
 * Class holding utility functions for the application
 */
class Beer {
    constructor() {
    }

    /**
     * Initialize Bulma mobile navbar
     * from https://bulma.io/documentation/components/navbar/
     */
    initializeNavbar() {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }
    }

    /**
     * Refresh user token if logged in
     */
    initializeHeartbeat() {
        window.setInterval(function () {
            if (window.localStorage.getItem('token') !== null) {
                window.Axios.post('/refresh', {})
                    .then(response => {
                        let token = response.data.data.access_token;

                        window.localStorage.setItem('token', token);
                        window.Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }, 60000);
    }

    // Auth was already setup in the API, this way we can see how the app would work
    testLogin() {
        return window.Axios.post('/login', {
            email: 'testy@test.com',
            password: 'foobarfizzbuzz',
        })
            .then(response => {
                let token = response.data.data.access_token;

                window.localStorage.setItem('token', token);
                window.Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                return response;
            })
            .catch(error => {
                return error;
            });
    }
}

export default new Beer();