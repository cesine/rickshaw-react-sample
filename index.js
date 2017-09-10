const timestamps = require('./data.json');

const data = timestamps.map(function(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const firstDayOfTheYear = new Date(year + "-01-01");
  const millisecondsInADay = 60 * 60 * 1000 * 24;
  const dayOfTheYear = (date - firstDayOfTheYear) / millisecondsInADay;
  return {
    timestamp: timestamp,
    date: date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    week: Math.floor(dayOfTheYear / 7) - 1,
    weekday: date.getDay(),
    hour: date.getHours()
  };
});

console.log(data[0], data[data.length - 1]);

const startDate = data[0].date;
const endDate = data[data.length - 1].date;

const deploysPerDay = [];
const deploysPerWeek = [];
const daysWithoutDeploys = [];
const deploysByHour = [];
const deploysByDayOfTheWeek = [];

const years = [2016, 2017];
const weeks = [];
let i = 0;
for (i = 0; i < 52; i++) {
  weeks[i] = i + 1;
}
const weekdays = [];
for (i = 0; i < 7; i++) {
  weekdays[i] = i + 1;
}
for (i = 0; i < 24; i++) {
  deploysByHour[i] = {
    hour: i,
    count: 0
  };
}

years.forEach(function(year) {
  weeks.forEach(function(week) {
    if (year === 2016 && week < 8) {
      return;
    }
    if (year === 2017 && week > 34) {
      return;
    }

    deploysPerWeek.push({
      yearWeek: year + 'w' + week,
      year: year,
      week: week,
      count: 0
    });

    weekdays.forEach(function(weekday) {
      deploysPerDay.push({
        yearWeekDay: year + 'w' + week + 'd' + weekday,
        year: year,
        week: week,
        weekday: weekday,
        count: 0
      });
    });
  });
});

data.forEach(function(datum) {
  deploysPerWeek.forEach(function(week) {
    if (week.week == datum.week) {
      week.count++;
    }
  });
  deploysPerDay.forEach(function(day) {
    if (day.week == datum.week && day.weekday == datum.weekday) {
      day.count++;
    }
  });

  deploysByHour[datum.hour].count++;
});

deploysPerDay.forEach(function(day) {
  if (!day.count && day.weekday > 1 && day.weekday < 6) {
    daysWithoutDeploys.push(day);
  }
});

console.log('deploysByHour', deploysByHour);
console.log('deploysPerWeek', deploysPerWeek[deploysPerWeek.length - 1]);
console.log('deploysPerDay', deploysPerDay[deploysPerDay.length - 3]);
console.log('daysWithoutDeploys: ' + daysWithoutDeploys.length, daysWithoutDeploys[daysWithoutDeploys.length - 3]);
