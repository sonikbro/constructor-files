var table = [
    { key: '2719', date: '27 мая', time: '19:00'},
    { key: '2812', date: '28 мая', time: '12:00'},
    { key: '2819', date: '28 мая', time: '19:00'},
    { key: '2912', date: '29 мая', time: '12:00'},
    { key: '2919', date: '29 мая', time: '19:00'},
    ],
    dateTime = new Date,
    zeroHours = dateTime.getHours(),
    currentTime = +(dateTime.getDate() + "" + ("0" + zeroHours).slice(-2));

const found = table.find(el => el.key > currentTime);
$('.cDate').text(found.date);
$('.cTime').text(found.time);