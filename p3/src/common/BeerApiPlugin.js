const BeerApiPlugin = {
    install (Vue) {
        Vue.prototype.$beerApi = {
            axios: require('axios').default.create({
                baseURL: process.env.VUE_APP_API_URL,
                headers: {
                    common: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json',
                    },
                },
            }),

            getStyles: async function () {
                let data = {};

                await this.axios.get('/beer/styles')
                    .then(response => {
                        if (this.validateResponse(response, 'styles')) {
                            data = response.data.data.styles;
                        }
                    });

                return data;
            },

            getList: async function (params) {
                let return_data = [];

                await this.axios.get('/beer', {
                    params: params,
                })
                    .then(response => {
                        if (this.validateResponse(response, 'beers')) {
                            let beers = response.data.data.beers;
                            beers.map(beer => {
                                beer.is_expanded = false;

                                return beer;
                            });

                            return_data = [beers, response.data.data.page, response.data.data.count];
                        }
                    });

                return return_data;
            },

            getBeer: async function (id) {
                let beer = {};

                await this.axios.get('/beer/' + id, {})
                    .then(response => {
                        if (this.validateResponse(response, 'beer')) {
                            beer = response.data.data.beer;
                        }
                    });

                return beer;
            },

            postBeer: async function (beer) {
                let return_beer = {};

                await this.axios.post('/beer', beer)
                    .then(response => {
                        if (this.validateResponse(response, 'beer')) {
                            return_beer = response.data.data.beer;
                        }
                    });

                return return_beer;
            },

            putBeer: async function (id, beer) {
                let return_beer = {};

                await this.axios.put('/beer/' + id, beer)
                    .then(response => {
                        if (this.validateResponse(response, 'beer')) {
                            return_beer = response.data.data.beer;
                        }
                    });

                return return_beer;
            },

            getHome: async function () {
                let content = 'There was a problem loading the home page, please try again.';

                await this.axios.get('/beer/home')
                    .then(response => {
                        if (this.validateResponse(response, 'page')) {
                            if (Object.prototype.hasOwnProperty.call(response.data.data.page, 'content')) {
                                content = response.data.data.page.content;
                            }
                        }
                    });

                return content;
            },

            login: async function (email, password) {
                let logged_in = false;

                await window.Axios.post('/login', {
                    email: email,
                    password: password,
                })
                    .then(response => {
                        let token = response.data.data.access_token;

                        window.localStorage.setItem('token', token);
                        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                       logged_in = true;
                    });

                return logged_in;
            },

            initHeartbeat: function () {
                window.setInterval(() => {
                    if (window.localStorage.getItem('token') !== null) {
                        this.axios.post('/refresh', {})
                            .then(response => {
                                let token = response.data.data.access_token;

                                window.localStorage.setItem('token', token);
                                this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                }, 60000);
            },

            validateResponse: function (response, test_property) {
                let has_data = Object.prototype.hasOwnProperty.call(response.data, 'data');
                let has_test_property = has_data ? Object.prototype.hasOwnProperty.call(response.data.data, test_property) : false;

                return has_data && has_test_property;
            },
        }
    }
}

export default BeerApiPlugin;