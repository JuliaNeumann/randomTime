import Db from '../../app/services/db.js';

jest.mock('pg');

describe('db service', () => {

  it('can store a weekplan for a specific user', async () => {
    jest.spyOn(global.console, 'log');
    expect(Db.storeWeekplan).toBeDefined();
    await Db.storeWeekplan({name: 'my awesome weekplan'}, 'Jule');
    expect(console.log).toHaveBeenCalledWith(`Successfully stored weekplan for user Jule`);
  });

  it('can retrieve a weekplan for a specific user', async () => {
    expect(Db.retrieveWeekplan).toBeDefined();
    const result = await Db.retrieveWeekplan('Jule');
    expect(result).toBeDefined();
  });

});