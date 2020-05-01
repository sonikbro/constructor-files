var table = [ 
    { key: '612', date: '6 мая', time: '12:00'},
    { key: '619', date: '6 мая', time: '19:00'},
    { key: '712', date: '7 мая', time: '12:00'},
    { key: '719', date: '7 мая', time: '19:00'},
    { key: '812', date: '8 мая', time: '12:00'},
    { key: '819', date: '8 мая', time: '19:00'},
    { key: '912', date: '9 мая', time: '12:00'},
    { key: '919', date: '9 мая', time: '19:00'},
 ];

var dateTime = new Date(),
    currentTime = +(dateTime.getDate() + '' + dateTime.getHours());

console.log(currentTime);

const found = table.find(el => el.key > currentTime);
$('.cDate').text(found.date);
$('.cTime').text(found.time);