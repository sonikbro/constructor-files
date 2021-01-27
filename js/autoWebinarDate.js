// Автозамена дат
const table = [
    // key: [0-0] == номер месяца +1, [1-2] == число, [3-4] == время перевода
    { key: '20818', date: '1 — 3 февраля'},
    { key: '21518', date: '8 — 10 февраля'},
    { key: '22218', date: '15 — 17 февраля'}
],
    date = new Date,
    // Генерируем ключ реального времени для сравнения с таблицей
    currentTime = +((date.getMonth() + 1) + "" +  ("0" +date.getDate()).slice(-2) + "" + ("0" + date.getHours()).slice(-2));


    // Выводим дату следующего вебинара
const found = table.find(el => el.key > currentTime);