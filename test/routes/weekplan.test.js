import { shallow, mount } from 'vue-test-utils';
import Weekplan from '../../app/routes/weekplan/weekplan.vue';

describe('Weekplan', () => {
  const wrapper = mount(Weekplan);

  it('renders the correct markup', () => {
    const shallowComp = shallow(Weekplan);
    expect(shallowComp.element).toMatchSnapshot();
  });

  it('triggers request for setting a weekplan on click and displays success message', () => {
    global.axios = {};
    axios.post = () => {
      return {
        then: (callback) => {
          callback({
            data: {
              success: true
            }
          });
          return {
            catch: () => {
              return true;
            }
          }
        }
      }
    };

    wrapper.find('input[type="submit"]').trigger('click');
    const successMsg = wrapper.find('.uk-alert-primary');
    expect(successMsg).toBeDefined;

    const errorMsg = wrapper.find('.uk-alert-danger');
    expect(errorMsg).toBeUndefined;
  });

  it('triggers request for setting a weekplan on click and displays error message', () => {
    global.axios = {};
    axios.post = () => {
      return {
        then: () => {
          return {
            catch: (callback) => {
              callback({data: 'error'});
            }
          }
        }
      }
    };

    wrapper.find('input[type="submit"]').trigger('click');
    const successMsg = wrapper.find('.uk-alert-primary');
    expect(successMsg).toBeUndefined;

    const errorMsg = wrapper.find('.uk-alert-danger');
    expect(errorMsg).toBeDefined;
    expect(errorMsg.text()).toBe('error');
  });

});