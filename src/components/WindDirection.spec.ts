import { shallowMount } from '@vue/test-utils';
import WindDirection from './WindDirection.vue';
import {expect} from "vitest";

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
		const windDirectionArrow = wrapper.find('[data-testid="wind-direction-arrow"]');
		const windDirectionArrowAttributeStyle = windDirectionArrow.attributes('style');
		const windDirectionArrowInnerHTML = windDirectionArrow.html();

		expect(windDirectionArrowAttributeStyle).toContain('rotate(90deg)');
		expect(windDirectionArrowInnerHTML).toContain('⬇');
	});

	it('Renders the correct wind direction for screen readers', () => {
		const wrapper = shallowMount(WindDirection, {
			props : { degrees : 270 }
		});
		const elementScreenReaderOnly = wrapper.find('[data-testid="wind-direction-sr"]');
		const elementScreenReaderOnlyClasses = elementScreenReaderOnly.classes();
		const elementScreenReaderOnlyHTML = elementScreenReaderOnly.html();

		expect(elementScreenReaderOnlyClasses).toContain('sr-only');
		expect(elementScreenReaderOnlyHTML).toContain('Wind direction: 270 degrees');
	});
});