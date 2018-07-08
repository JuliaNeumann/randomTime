import { mount } from 'vue-test-utils';
import Main from '../../app/routes/main/main.vue';

describe('Main', () => {
  const wrapper = mount(Main);

  it('renders the correct markup', () => {
    expect(wrapper.contains('h1')).toBe(true);
    expect(wrapper.contains('p')).toBe(true);
  })

});