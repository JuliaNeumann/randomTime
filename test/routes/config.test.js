import { shallow } from 'vue-test-utils';
import Config from '../../app/routes/config/config.vue';

describe('Config', () => {
  const wrapper = shallow(Config);

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

});