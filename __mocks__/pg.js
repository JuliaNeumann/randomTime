const pg = jest.genMockFromModule('pg');

let mockStore = {};

function Client() {
  this.query = function(queryText, values) {
    if (queryText.startsWith('UPDATE')) {
      mockStore[values[0]] = values[1]; // map of user => plan
      return {
        rows: [{
          plan: mockStore[values[0]],
          config: mockStore[values[0]]
        }]
      };
    }
    if (queryText.startsWith('SELECT')) {
      return {
        rows: [{
          plan: mockStore[values[0]],
          config: mockStore[values[0]]
        }]
      };
    }
  };

  this.connect = function() {
    return true;
  };

  this.end = function() {
    return true;
  };
}

pg.Client = Client;

module.exports = pg;