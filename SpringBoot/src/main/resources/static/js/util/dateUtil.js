
var myDateUtil = {};

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
Date.daysInMonth = function (year, month) {
    if (month == 1) {
        if (year % 4 == 0 && year % 100 != 0)
            return 29;
        else
            return 28;
    } else if ((month <= 6 && month % 2 == 0) || (month = 6 && month % 2 == 1))
        return 31;
    else
        return 30;
};
Date.prototype.addMonth = function (addMonth) {
    var y = this.getFullYear();
    var m = this.getMonth();
    var nextY = y;
    var nextM = m;
    //如果当前月+要加上的月>11 这里之所以用11是因为 js的月份从0开始
    if (m > 11) {
        nextY = y + 1;
        nextM = parseInt(m + addMonth) - 11;
    } else {
        nextM = this.getMonth() + addMonth
    }
    var daysInNextMonth = Date.daysInMonth(nextY, nextM);
    var day = this.getDate();
    if (day > daysInNextMonth) {
        day = daysInNextMonth;
    }
    return new Date(nextY, nextM, day);
};
//2018-2-20
Date.prototype.getCurrentLastDay = function (d) {
    var current=new Date(d);
    var currentMonth=current.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
    var minusDate=1000*60*60*24;
    return new Date(nextMonthDayOne.getTime()-minusDate);
};
//获取系统前一周的时间
Date.prototype.get7DayAgo = function () {
    let nowdate = new Date();
    let oneweekdate = new Date(nowdate-7*24*3600*1000);
    let y = oneweekdate.getFullYear();
    let m = oneweekdate.getMonth()+1;
    let d = oneweekdate.getDate();
    return formatwdate = y+'-'+m+'-'+d;
}

// 获取多少天前
Date.prototype.getDayAgo = function (endDay,day) {
    let d = new Date(endDay);
    return d.setDate(d.getDate()-day);
}

// 获取多少月前
Date.prototype.getMonthAgo = function (endDay,month) {
    let d = new Date(endDay);
    return d.setMonth(d.getMonth()-month);
}

/**********************************
 * @funcname Format
 * @funcdesc 重写Date的Format方法，用于格式化日期
 * @param {Date} fmt (input)
 想要进行格式化的日期
 * @return {String}
 * @author 林楚佳
 * @create 20170428
 * @modifier
 * @modify
 ***********************************/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 获取日期所属周
myDateUtil.getISOYearWeek = function(date) {
    var commericalyear = myDateUtil.getCommerialYear(date);
    var date2 = myDateUtil.getYearFirstWeekDate(commericalyear);
    var day1 = date.getDay();
    if (day1 == 0) day1 = 7;
    var day2 = date2.getDay();
    if (day2 == 0) day2 = 7;
    var d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d / 7) + 1;
}

myDateUtil.getYearFirstWeekDate = function(commericalyear) {
    var yearfirstdaydate = new Date(commericalyear, 0, 1);
    var daynum = yearfirstdaydate.getDay();
    var monthday = yearfirstdaydate.getDate();
    if (daynum == 0) daynum = 7;
    if (daynum <= 4) {
        return new Date(yearfirstdaydate.getFullYear(), yearfirstdaydate.getMonth(), monthday + 1 - daynum);
    } else {
        return new Date(yearfirstdaydate.getFullYear(), yearfirstdaydate.getMonth(), monthday + 8 - daynum)
    }
}

myDateUtil.getCommerialYear = function(date) {
    var daynum = date.getDay();
    var monthday = date.getDate();
    if (daynum == 0) daynum = 7;
    var thisthurdaydate = new Date(date.getFullYear(), date.getMonth(), monthday + 4 - daynum);
    return thisthurdaydate.getFullYear();
}