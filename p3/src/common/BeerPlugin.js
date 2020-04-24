const BeerPlugin = {
    install (Vue) {
        Vue.prototype.$beerLogin = function () {
            console.log('log in');
            console.log(this.$store.state);
        }
    }
}

export default BeerPlugin;