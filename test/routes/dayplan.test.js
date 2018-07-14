import { shallow } from 'vue-test-utils';
import Dayplan from '../../app/routes/dayplan/dayplan.vue';

describe('Dayplan', () => {
  const wrapper = shallow(Dayplan);

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  })

});