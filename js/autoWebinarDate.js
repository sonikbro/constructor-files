const table = [
    // key: [0-0] == номер месяця +1 (Month), [1-2] == число (Day), [3-4] == время перевода (Time)
    { key: '20818', date: '1 — 3 февраля'},
    { key: '21518', date: '8 — 10 февраля'},
    { key: '22218', date: '15 — 17 февраля'},
    { key: '30118', date: '1 — 3 марта'}
],
    date = new Date,
    currentTime = +((date.getMonth() + 1) + "" +  ("0" +date.getDate()).slice(-2) + "" + ("0" + date.getHours()).slice(-2));


const found = table.find(el => el.key > currentTime);