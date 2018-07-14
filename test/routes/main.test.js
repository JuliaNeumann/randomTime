import { shallow } from 'vue-test-utils';
import Main from '../../app/routes/main/main.vue';

describe('Main', () => {
  const wrapper = shallow(Main);

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  })

});