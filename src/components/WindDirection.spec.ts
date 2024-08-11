import { shallowMount } from '@vue/test-utils';
import WindDirection from './WindDirection.vue';

describe('WindDirection', () => {
	it('Simple renders without crashing', () => {
		const wrapper = shallowMount(WindDirection, {
			props : { degrees : 90 }
		});

		expect(wrapper).toBeTruthy();
	});

	it('Renders the indicator with the correct wind direction', () => {
		const wrapper = shallowMount(WindDirection, {
			props : { degrees : 90 }
		});
		const windDirectionArrow = wrapper.find('[data-testid="wind-direction-arrow"');
		const windDirectionArrowAttributeStyle = windDirectionArrow.attributes('style');
		const windDirectionArrowInnerHTML = windDirectionArrow.html();

		expect(windDirectionArrowAttributeStyle).toContain('rotate(90deg)');
		expect(windDirectionArrowInnerHTML).toContain('⬇');
	});
});