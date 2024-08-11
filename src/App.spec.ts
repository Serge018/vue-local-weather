import { shallowMount } from '@vue/test-utils';
import GetLocation from './components/Geolocation.vue';
import App from './App.vue';

describe('App', (): void => {
	it('Renders GetLocation component', () => {
		const wrapper = shallowMount<App>(App);
		const isExistGetLocationComponent = wrapper.findComponent(GetLocation).exists();
		expect(isExistGetLocationComponent).toBe(true);
	});
});