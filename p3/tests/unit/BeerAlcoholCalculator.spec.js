import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BeerAlcoholCalculator from '@/assets/components/tools/BeerAlcoholCalculator.vue'

describe('BeerAlcoholCalculator.vue', () => {
    it('Calculates ABV Correctly', () => {
        const wrapper = shallowMount(BeerAlcoholCalculator, {
            data() {
                return {
                    original_gravity: 1.055,
                    final_gravity: 1.008,
                };
            },
        });

        expect(wrapper.text()).to.include('6.2 %');
    })
})
