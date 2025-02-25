const moment = require("moment");

function formateDate(str) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
        const date = new Date(str);
        const formatedStr = moment(date).format('MM-DD-YYYY');
        return new Date(formatedStr);
    }
    else if (/^(\d{1,2})-(\d{1,2})-(\d{4})$/.test(str)) {
        const [month, day, year] = str.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const formatedStr = moment(date).format('MM-DD-YYYY');
        return new Date(formatedStr);
    }
}


module.exports = { formateDate };