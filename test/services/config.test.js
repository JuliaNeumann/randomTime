import Config from '../../app/services/config.js';
import db from '../../app/services/db.js';


describe('config service', () => {

  it('gets the config', async () => {
    db.retrieveConfig = jest.fn();

    db.retrieveConfig.mockReturnValueOnce(['a', 'b', 'c']);
    const result = await Config.getConfig('Jule');

    expect(db.retrieveConfig).toHaveBeenCalledWith('Jule');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('sets the config', async () => {
    db.storeConfig = jest.fn();

    Config.setConfig('Jule', 0.5, ['a', 'b']);
    expect(db.storeConfig).toHaveBeenCalledWith({slotLength: 0.5, activities: ['a', 'b']}, 'Jule');
  });

});