import { shallow } from 'vue-test-utils';
import Menu from '../../app/routes/main/menu.vue';

describe('Menu', () => {
  const wrapper = shallow(Menu, {
    propsData: {
      active: 'weekplan'
    }
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('marks the current page menu item as active', () => {
    const menuItems = wrapper.findAll('li');
    expect(menuItems.at(0).classes()).toContain('uk-active');
    expect(menuItems.at(1).classes()).not.toContain('uk-active');
  });
});