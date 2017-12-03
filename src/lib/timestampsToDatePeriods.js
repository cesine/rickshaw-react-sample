const timestamps = require('../data.json');

function timestampsToDatePeriods(start, end) {
  const data = timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const firstDayOfTheYear = new Date(`${year}-01-01`);
    const millisecondsInADay = 60 * 60 * 1000 * 24;
    const dayOfTheYear = (date - firstDayOfTheYear) / millisecondsInADay;
    return {
      timestamp,
      date,
      year,
      month: date.getMonth() + 1,
      week: Math.floor(dayOfTheYear / 7) - 1,
      weekday: date.getDay(),
      hour: date.getHours(),
    };
  }).filter((item) => {
    if (!start && !end) {
      return true;
    }

    if (item.year < start.year || item.year > end.year) {
      // console.log('filtering by year', item);
      return false;
    }

    if (start && item.year === start.year && item.week < start.week) {
      // console.log('filtering by start week', item);
      return false;
    }

    if (end && item.year === end.year && item.week > end.week) {
      // console.log('filtering by end week', item);
      return false;
    }

    return true;
  });

  const startDate = data[0];
  const endDate = data[data.length - 1];

  const deploysPerDay = [];
  const deploysPerDayHistogram = [];
  const deploysPerWeek = [];
  const daysWithoutDeploys = [];
  const deploysByHour = [];
  const deploysByDayOfTheWeek = [];

  const years = [];
  for (let y = data[0].year; y <= data[data.length - 1].year; y++) {
    years.push(y);
  }

  const weeks = [];
  let i = 0;
  for (i = 0; i < 52; i++) {
    weeks[i] = i + 1;
  }
  const weekdays = [];
  for (i = 0; i < 7; i++) {
    weekdays[i] = i;
    deploysByDayOfTheWeek[i] = {
      weekday: i,
      count: 0,
    };
  }
  for (i = 0; i < 24; i++) {
    deploysByHour[i] = {
      hour: i,
      count: 0,
    };
  }

  years.forEach((year) => {
    weeks.forEach((week) => {
      if (year === startDate.year && week < startDate.week) {
        return;
      }
      if (year === endDate.year && week > endDate.week) {
        return;
      }

      deploysPerWeek.push({
        yearWeek: `${year}w${week}`,
        year,
        week,
        count: 0,
        deploys: [],
      });

      weekdays.forEach((weekday) => {
        deploysPerDay.push({
          yearWeekDay: `${year}w${week}d${weekday}`,
          year,
          week,
          weekday,
          count: 0,
          deploys: [],
        });
      });
    });
  });

  let maxDeployCount = 0;
  data.forEach((datum) => {
    deploysPerWeek.forEach((week) => {
      if (week.year === datum.year && week.week === datum.week) {
        // eslint-disable-next-line no-param-reassign
        week.count++;
        week.deploys.push(datum);
      }
    });
    deploysPerDay.forEach((day) => {
      if (day.year === datum.year && day.week === datum.week && day.weekday === datum.weekday) {
        // eslint-disable-next-line no-param-reassign
        day.count++;
        day.deploys.push(datum);
        if (day.count > maxDeployCount) {
          maxDeployCount = day.count;
        }
      }
    });

    deploysByHour[datum.hour].count++;
    deploysByDayOfTheWeek[datum.weekday].count++;
  });

  // Prepare histogram
  for (i = 0; i < maxDeployCount; i++) {
    deploysPerDayHistogram[i] = {
      freq: 0,
      count: i,
    };
  }

  deploysPerDay.forEach((day) => {
    // Only analyze working days
    if (day.weekday !== 0 && day.weekday !== 6) {
      if (!day.count) {
        daysWithoutDeploys.push(day);
      }
      deploysPerDayHistogram[day.count] = deploysPerDayHistogram[day.count] || {
        freq: 0,
        count: day.count,
      };
      deploysPerDayHistogram[day.count].freq++;
    }
  });

  return {
    startDate,
    endDate,
    data,
    deploysPerDay,
    deploysPerDayHistogram,
    deploysPerWeek,
    daysWithoutDeploys,
    deploysByHour,
    deploysByDayOfTheWeek,
  };
}

module.exports = timestampsToDatePeriods;
