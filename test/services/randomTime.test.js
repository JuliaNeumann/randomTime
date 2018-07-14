import RandomTime from '../../app/services/randomTime.js';
import db from '../../app/services/db.js';


describe('randomTime service', () => {

  function countInArray(array, what) {
    return array.filter(item => item == what).length;
  }

  it('creates a weekplan with the correct number of slots & activities', async () => {
      db.storeWeekplan = jest.fn();
      RandomTime.createWeekPlan(5);
      expect(db.storeWeekplan).toHaveBeenCalled();

      const plan = db.storeWeekplan.mock.calls[0][0];
      expect(plan.length).toEqual(10);

      RandomTime.config.activities.forEach((activity) => {
        expect(countInArray(plan, activity.name)).toBeGreaterThanOrEqual(2);
      });
  });

  it('retrieves a dayplan with the correct number of slots and updates weekplan', async () => {
    db.storeWeekplan = jest.fn();
    db.retrieveWeekplan = jest.fn();

    db.retrieveWeekplan.mockReturnValueOnce(['a', 'b', 'c', 'd']);
    const result = await RandomTime.getDayPlan(1);

    expect(db.retrieveWeekplan).toHaveBeenCalledWith('Jule');
    expect(result).toEqual(['a', 'b']);

    expect(db.storeWeekplan).toBeCalled();
    const newPlan = db.storeWeekplan.mock.calls[0][0];
    expect(newPlan).toEqual(['c', 'd']);
  });

  it('warns if trying to retrieve a dayplan and no weekplan is set, does not set new one', async () => {
    db.storeWeekplan = jest.fn();
    db.retrieveWeekplan = jest.fn();
    jest.spyOn(global.console, 'warn');

    db.retrieveWeekplan.mockReturnValueOnce([]);
    const result = await RandomTime.getDayPlan(1);

    expect(result).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
    expect(db.storeWeekplan).not.toHaveBeenCalled();
  });

});