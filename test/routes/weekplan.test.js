import { shallow } from 'vue-test-utils';
import Weekplan from '../../app/routes/weekplan/weekplan.vue';

describe('Weekplan', () => {
  const wrapper = shallow(Weekplan);

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  })

});