var calendar = (function () {
  var container, month, year,
  cal_days_labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'], // days of the week
  cal_days_long_labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // days of the week (long labels)
  cal_months_labels = ['January', 'February', 'March', 'April',
                       'May', 'June', 'July', 'August', 'September',
                       'October', 'November', 'December']; // month name labels

  function init(wrapperId) {
    var currentDate = new Date();
    container = document.getElementById(wrapperId);
    container.className += ' cal-widget';
    container.innerHTML = createLeftPane(currentDate.getDay(), currentDate.getDate()) + createCal(currentDate.getFullYear(), currentDate.getMonth());

    document.addEventListener("click", function(e){
      e.preventDefault();

      if (e.target.className === 'prev') {
        switchMonth(false);
      }
    });
    document.addEventListener("click", function(e){
      e.preventDefault();

      if (e.target.className === 'next') {
        switchMonth(true);
      }
    });
    document.addEventListener("click", function(e){
      e.preventDefault();

      if (e.target.className === 'cal-month-day') {
        highlightDate(e.target.innerText);
      }
    });
  }

  function highlightDate(date) {
    var current = document.getElementsByClassName('cal-month_year')[0].innerHTML.split(' '),
    currentYear = parseInt(current[1], 10),
    day = new Date(currentYear, cal_months_labels.indexOf(current[0]), date).getDay();

    container.getElementsByClassName('cal-today')[0].outerHTML = createLeftPane(day, date);
  }

  function switchMonth(next, month, year) {
    var current = document.getElementsByClassName('cal-month_year')[0].innerHTML.split(' '),
    currentYear = parseInt(current[1], 10);

    if (next) {
      if (current[0] === 'December') {
        month = 0;
      } else {
        month = cal_months_labels.indexOf(current[0]) + 1;
      }
    } else {
      if (current[0] === 'January') {
        month = 11;
      } else {
        month = cal_months_labels.indexOf(current[0]) - 1;
      }
    }

    if (next && month === 0) {
      year = currentYear + 1;
    } else if (!next && month === 11) {
      year = currentYear - 1;
    } else {
      year = currentYear;
    }

    container.getElementsByClassName('cal-month')[0].outerHTML = createCal(year, month);
  }

  function createLeftPane(day, date) {
    var html;

    html = '<div class="cal-today">';
    html += '<h2 class="cal-today-day">' + cal_days_long_labels[day] + '</h2>';
    html += '<p class="cal-today-date">' + date + '</p>';
    html += '</div>';

    return html;
  }

  function createCal(year, month) {
    var cal_current_date = new Date(), // current date
    startDay = new Date(year, month, 1).getDay(), // day of the week the month starts on
    monthLength = cal_months_labels[month], // length of current month
    daysInMonths = [31, ( ( ( year % 4 === 0 ) && ( year % 100 !== 0 ) ) || ( year % 400 === 0 ) ) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // total days in each month
    daysRemain = true,
    day = 1,
    highlight,
    i, j,
    html;

    html = '<div class="cal-month">';
    html += '<div class="cal-controls">';
    html += '<a href="#" class="prev">&lt;</a>';
    html += '<h2 class="cal-month_year">' + cal_months_labels[month] + ' ' + year + '</h2>';
    html += '<a href="#" class="next">&gt;</a>';
    html += '</div>';
    html += '<table id="cal-display"><thead><tr>';
    for (i = 0; i <= 6; i++) {
      html += '<th>' + cal_days_labels[i] + '</th>';
    }
    html += '</tr></thead>';
    html += '<tbody>';
    i = 0;
    while (daysRemain) {
      html += '<tr>';
      for (j = 0; j <= 6; j++) {
        if (i === 0) {
          if (j === startDay) {
            highlight = cal_current_date.getMonth() === month && cal_current_date.getDate() === day && cal_current_date.getFullYear() === year ? ' class="cal-month-today"' : '';
            html += '<td' + highlight + '><a href="#" class="cal-month-day">' + day + '</a></td>';
            day++;
            startDay++;
          } else {
            html += '<td></td>';
          }
        } else if ( day <= daysInMonths[month] ) {
          highlight = cal_current_date.getMonth() === month && cal_current_date.getDate() === day && cal_current_date.getFullYear() === year ? ' class="cal-month-today"' : '';
          html += '<td' + highlight + '><a href="#" class="cal-month-day">' + day + '</a></td>';
          day++;
        } else {
          html += '<td></td>';
          daysRemain = false;
        } if ( day > daysInMonths[month] ) {
          daysRemain = false;
        }
      }
      html += '</tr>';
      i++;
    }
    html += '</tbody></table></div>';

    return html;
  }

  return {
      init: init
  };
});

var cal = calendar();
cal.init('calendar');
