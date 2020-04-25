const BeerApiPlugin = {
    install (Vue) {
        Vue.prototype.$beerLogin = function () {
            console.log(this);
        }
    }



}

export default BeerApiPlugin;