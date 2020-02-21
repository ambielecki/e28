let app = new Vue({
    el: '#app',
    data: {
        item: null,
        quantity: null,
        message: null,
        items: [],
    },
    computed: {
        total_items: function () {
            let total = 0;
            this.items.forEach(item => {
                total += item.quantity;
            });

            return total;
        },
    },
    methods: {
        addItem: function () {
            this.message = null;

            if (this.item && this.quantity) {
                this.items.push({
                    item: this.item,
                    quantity: Number(this.quantity),
                });

                this.item = null;
                this.quantity = null;
            } else {
                this.message = 'You must enter an item and a quantity';
            }
        }
    },
});