import { shallowMount } from '@vue/test-utils';
import Geolocation from './Geolocation.vue';
import {expect, vi} from 'vitest'

describe('Geolocation', () => {
	it('Simple render without crushing', async (): Promise<void> => {
		global.navigator.geolocation = {
			getCurrentPosition : () => {}
		};
		const wrapper = await shallowMount(Geolocation);
		
		expect(wrapper).toBeTruthy();
	});

	it('Displays when geolocation resolved successfully', async (): Promise<void> => {
		const mockGeolocation = vi.fn((successCallback: Function) => {
			const position = {
				coords : {
					latitude: 51.5074,
					longitude: -0.1278,
				}
			};
			successCallback(position);
		});
		global.navigator.geolocation = {
			getCurrentPosition : mockGeolocation
		};
		const wrapper = await shallowMount(Geolocation);

		expect(wrapper.vm.coords).toEqual({
			latitude: 51.5074,
			longitude: -0.1278
		});
	});

	it('Displays a message when user denied access', async (): Promise<void> => {
		const mockGeolocation = vi.fn((successCallback: Function, errorCallback: Function) => {
			const error = new Error ('User denied geolocation access');
			errorCallback(error);
		});
		global.navigator.geolocation = {
			getCurrentPosition : mockGeolocation
		};
		const wrapper = await shallowMount(Geolocation);

		expect(wrapper).toBeTruthy();
		expect(wrapper.vm.geolocationByUser).toEqual(true);
		expect(wrapper.html()).toContain('User denied access');
	});
});