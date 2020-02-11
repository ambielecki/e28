document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const navbar_burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if (navbar_burgers.length > 0) {

        // Add a click event on each of them
        navbar_burgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target_data = el.dataset.target;
                const target = document.getElementById(target_data);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                target.classList.toggle('is-active');

            });
        });
    }

    document.querySelectorAll('.navbar-link').forEach(function(navbarLink){
        navbarLink.addEventListener('click', function(){
            navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
        })
    });
});