const { Chromeless } = require('chromeless');
const dateformat = require('dateformat');
const {
  startOfMonth,
  endOfMonth,
  isAfter,
  isFriday,
  isSaturday,
  addDays,
} = require('date-fns');
var cp = require('child_process');

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function run() {
  let currDate = startOfMonth(new Date());
  while (!isAfter(currDate, endOfMonth(new Date()))) {
    if (!isFriday(currDate) && !isSaturday(currDate)) {
      fillData(currDate);
      await sleep(6000);
    }
    currDate = addDays(currDate, 1);
  }
}

async function fillData(date) {
  const formatted = dateformat(date, 'yyyy-mm-dd');
  const jd = dateformat(startOfMonth(new Date()), 'yyyy-mm-dd');
  const chromeless = new Chromeless();
  const screenshot = await chromeless
    .goto(
      `http://checkin.timewatch.co.il/punch/editwh2.php?ie=4266&e=188275&d=${formatted}&jd=${jd}&tl=188275`
    )
    .wait(2000)
    .type('9', 'input[name="ehh0"]')
    .wait(1000)
    .type('25', 'input[name="emm0"]')
    .wait(1000)
    .type('19', 'input[name="xhh0"]')
    .wait(1000)
    .type('25', 'input[name="xmm0"]')
    .wait(1000)
    .click('input[name="B1"]');
  await sleep(3000);
  await chromeless.end();
  console.log(`filled for ${formatted}`);
}

run().catch(console.error.bind(console));
