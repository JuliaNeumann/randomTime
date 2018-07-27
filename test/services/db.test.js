import Db from '../../app/services/db.js';

jest.mock('pg');

describe('db service', () => {

  it('can store a weekplan for a specific user', async () => {
    jest.spyOn(global.console, 'log');
    expect(Db.storeWeekplan).toBeDefined();
    await Db.storeWeekplan({name: 'my awesome weekplan'}, 'Jule');
    expect(console.log).toHaveBeenLastCalledWith(`Successfully stored weekplan for user Jule`);
  });

  it('can retrieve a weekplan for a specific user', async () => {
    expect(Db.retrieveWeekplan).toBeDefined();
    await Db.storeWeekplan({name: 'my awesome weekplan'}, 'Jule');
    const result = await Db.retrieveWeekplan('Jule');
    expect(result).toBeDefined();
    expect(result.name).toEqual('my awesome weekplan');
  });

  it('can retrieve an empty weekplan when none is set for a specific user', async () => {
    const result = await Db.retrieveWeekplan('foo');
    expect(result).toBeDefined();
    expect(result).toEqual([]);
  });

  it('can store the config for a specific user', async () => {
    jest.spyOn(global.console, 'log');
    expect(Db.storeConfig).toBeDefined();
    await Db.storeConfig({name: 'my awesome config'}, 'Jule');
    expect(console.log).toHaveBeenLastCalledWith(`Successfully stored config for user Jule`);
  });

  it('can retrieve the config for a specific user', async () => {
    expect(Db.retrieveConfig).toBeDefined();
    await Db.storeConfig({name: 'my awesome weekplan'}, 'Jule');
    const result = await Db.retrieveConfig('Jule');
    expect(result).toBeDefined();
    expect(result.name).toEqual('my awesome weekplan');
  });

});