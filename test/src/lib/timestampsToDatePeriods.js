const timestampsToDatePeriods = require('../../../src/lib/timestampsToDatePeriods');
const expect = require('chai').expect;
const fixtures = require('fixturefiles');

describe('timestampsToDatePeriods', () => {
  describe('all data', () => {
    const index = timestampsToDatePeriods();

    describe('current dates', () => {
      it('should start in feb 2016', () => {
        // console.log(index.startDate);
        expect(index.startDate).to.deep.equal({
          timestamp: '2016-02-17T23:01:32.000Z',
          date: new Date('2016-02-17T23:01:32.000Z'),
          year: 2016,
          month: 2,
          week: 5,
          weekday: 3,
          hour: 18,
        });
      });

      it('should end in sept 2017', () => {
        // console.log(index.endDate);
        expect(index.endDate).to.deep.equal({
          timestamp: '2017-10-03T19:15:38.000Z',
          date: new Date('2017-10-03T19:15:38.000Z'),
          year: 2017,
          month: 10,
          week: 38,
          weekday: 2,
          hour: 15,
        });
      });
    });

    describe('locale', () => {
      it('should start week on sunday', () => {
        const date = new Date('2017-09-10 10:00:00');
        expect(date.getDay()).to.equal(0);
        expect(date.toString()).to.equal('Sun Sep 10 2017 10:00:00 GMT-0400 (EDT)');
      });

      it('should end week on saturday', () => {
        const date = new Date('2017-09-09 10:00:00');
        expect(date.getDay()).to.equal(6);
        expect(date.toString()).to.equal('Sat Sep 09 2017 10:00:00 GMT-0400 (EDT)');
      });

      it('should handle sql dates', () => {
        const date = new Date('2016-02-17 18:01:32');
        expect(date.getDay()).to.equal(3);
        expect(date.toString()).to.equal('Wed Feb 17 2016 18:01:32 GMT-0500 (EST)');
      });
    });

    describe('dates', () => {
      it('should match fixture data', () => {
        // console.log(JSON.stringify(index.data));
        const strigifiedData = index.data.map((item) => {
          if (item.date.toISOString) {
            // eslint-disable-next-line no-param-reassign
            item.date = item.date.toISOString();
          }
          return item;
        });
        expect(strigifiedData).to.deep.equal(fixtures.data);
      });
    });

    describe('deploysPerDay', () => {
      it('should match fixture deploysPerDay', () => {
        // console.log(JSON.stringify(index.deploysPerDay));
        const strigifiedData = index.deploysPerDay.map((item) => {
          item.deploys.map((deploy) => {
            if (deploy.date.toISOString) {
              // eslint-disable-next-line no-param-reassign
              deploy.date = deploy.date.toISOString();
            }
            return deploy;
          });
          return item;
        });
        expect(strigifiedData).to.deep.equal(fixtures.deploysPerDay);
      });
    });

    describe('deploysPerDayHistogram', () => {
      it('should match fixture deploysPerDayHistogram', () => {
        // console.log(JSON.stringify(index.deploysPerDayHistogram));
        expect(index.deploysPerDayHistogram).to.deep.equal(fixtures.deploysPerDayHistogram);
      });
    });

    describe('deploysPerWeek', () => {
      it('should match fixture deploysPerWeek', () => {
        // console.log(JSON.stringify(index.deploysPerWeek));
        const strigifiedData = index.deploysPerWeek.map((item) => {
          item.deploys.map((deploy) => {
            if (deploy.date.toISOString) {
              // eslint-disable-next-line no-param-reassign
              deploy.date = deploy.date.toISOString();
            }
            return deploy;
          });
          return item;
        });
        expect(strigifiedData).to.deep.equal(fixtures.deploysPerWeek);
      });
    });

    describe('daysWithoutDeploys', () => {
      it('should match fixture daysWithoutDeploys', () => {
        // console.log(JSON.stringify(index.daysWithoutDeploys));
        expect(index.daysWithoutDeploys).to.deep.equal(fixtures.daysWithoutDeploys);
      });
    });

    describe('deploysByHour', () => {
      it('should match fixture deploysByHour', () => {
        // console.log(JSON.stringify(index.deploysByHour));
        expect(index.deploysByHour).to.deep.equal(fixtures.deploysByHour);
      });
    });

    describe('deploysByDayOfTheWeek', () => {
      it('should match fixture deploysByDayOfTheWeek', () => {
        // console.log(JSON.stringify(index.deploysByDayOfTheWeek));
        expect(index.deploysByDayOfTheWeek).to.deep.equal(fixtures.deploysByDayOfTheWeek);
      });
    });

    describe('2017', () => {
      it('should have expected number of  deploysPerDay', () => {
        expect(index.deploysPerDay2017).length(266);
      });

      it('should have expected number of deploysPerWeek', () => {
        expect(index.deploysPerWeek2017).length(38);
      });

      it('should match fixture deploysPerDayHistogram2017', () => {
        // console.log(JSON.stringify(index.deploysPerDayHistogram2017));
        expect(index.deploysPerDayHistogram2017).to.deep.equal(fixtures.deploysPerDayHistogram2017);
      });
    });
  });
});
