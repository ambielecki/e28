import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BeerAlcoholCalculator from '@/assets/components/tools/BeerAlcoholCalculator.vue'

describe('BeerAlcoholCalculator.vue', () => {
    let starting_data = {
        original_gravity: 1.055,
        final_gravity: 1.008,
    };

    it('Calculates ABV Correctly', () => {
        // test for correct return from computed
        expect(BeerAlcoholCalculator.computed.abv.call(starting_data)).to.equal('6.2');
        // test a negative case
        expect(BeerAlcoholCalculator.computed.abv.call(starting_data)).to.not.equal('5.2');
    });

    it('Displays ABV Correctly', () => {
        const wrapper = shallowMount(BeerAlcoholCalculator, {
            data() {
                return starting_data;
            },
        });

        // test correct value in text
        expect(wrapper.text()).to.include('6.2 %');
        // test incorrect value is not displayed in text
        expect(wrapper.text()).to.not.include('5.2 %');
    });
})
