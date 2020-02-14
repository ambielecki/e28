let app = new Vue({
    el: '#app',
    data: {
        item: null,
        items: [],
    },
    methods: {
        addItem: function () {
            this.items.push(this.item);
            this.item = null;
        }
    },
});