import { shallow } from 'vue-test-utils';
import Dayplan from '../../app/routes/dayplan/dayplan.vue';

describe('Dayplan', () => {
  const wrapper = shallow(Dayplan);

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('triggers request for dayplan on click and displays it', () => {
    const resp = {data: {tasks: ['a', 'b']}};
    global.axios = {};
    axios.post = () => {
      return {then: (callback) => {
          callback(resp);
          return {
            catch: () => {
              return true;
            }
          }
        }
      }
    };

    wrapper.find('input[type="submit"]').trigger('click');
    const tasks = wrapper.findAll('li');

    expect(tasks.length).toBe(2);
    expect(tasks.at(0).text()).toBe('0.5h: a');
    expect(tasks.at(1).text()).toBe('0.5h: b');
  });

  it('triggers request for dayplan on click and displays message if there is no plan', () => {
    const resp = {data: {message: 'foo'}};
    global.axios = {};
    axios.post = () => {
      return {then: (callback) => {
          callback(resp);
          return {
            catch: () => {
              return true;
            }
          }
        }
      }
    };

    wrapper.find('input[type="submit"]').trigger('click');

    const tasks = wrapper.findAll('li');
    expect(tasks.length).toBe(0);

    const msg = wrapper.find('.uk-alert-warning');
    expect(msg).toBeDefined();
    expect(msg.text()).toBe('foo');
  });

  it('triggers request for dayplan on click and displays error if there is one', () => {
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

    const tasks = wrapper.findAll('li');
    expect(tasks.length).toBe(0);

    const msg = wrapper.find('.uk-alert-danger');
    expect(msg).toBeDefined();
    expect(msg.text()).toBe('error');
  });

});