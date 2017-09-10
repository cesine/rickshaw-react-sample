const index = require('../index.js');
const expect = require('chai').expect;

describe('index', () => {
  describe('current dates', () => {
    it('should start in feb 2016', () => {
      console.log(index.startDate);
      expect(index.startDate).to.deep.equal({
        timestamp: '2016-02-17 18:01:32',
        date: new Date('2016-02-17T23:01:32.000Z'),
        year: 2016,
        month: 2,
        week: 5,
        weekday: 3,
        hour: 18
      });
    });

    it('should end in sept 2017', () => {
      console.log(index.endDate);
      expect(index.endDate).to.deep.equal({
        timestamp: '2017-09-08 17:58:31',
        date: new Date('2017-09-08T21:58:31.000Z'),
        year: 2017,
        month: 9,
        week: 34,
        weekday: 5,
        hour: 17
      });
    });
  });
});
