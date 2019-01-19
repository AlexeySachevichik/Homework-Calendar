"use strict"

var listDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
var listMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


/**
 * БЫСТРОЕ ДОБАВЛЕНИЕ ЗАПИСИ
 */
var buttonFastAdd = document.getElementById('btn-fast-add');
var pupopFastAdd = document.getElementById('popup-fast-add');
var inputFastAdd = document.getElementById('pfa-input');
var statusFastAdd = document.getElementById('pfa-status');
var buttonFastAddSubmit = document.getElementById('pfa-btn-submit');
var buttonFastAddCancel = document.getElementById('pfa-btn-canсel');
var buttonFastAddClose = document.getElementById('pfa-btn-close');


/**
 * ОБНОВЛЕНИЕ
 */
var buttonUpdate = document.getElementById('btn-update');


/**
 * ПОИСК
 */
var inputSerach = document.getElementById('input-search');


/**
 * МЕСЯЦ РАНЕЕ, МЕСЯЦ ПОЗЖЕ, СЕГОДНЯ
 */
var buttonEarlier = document.getElementById('btn-earlier');
var buttonLater = document.getElementById('btn-later');
var buttonCurrent = document.getElementById('btn-current');


/**
 * ВЫБОР МЕСЯЦА
 */
var buttonMonth = document.getElementById('btn-month');
var pupopMonth = document.getElementById('popup-month');
var listPupopMonth = document.getElementsByClassName('pm-item');

/**
 * ВЫБОР ГОДА
 */
var buttonYear = document.getElementById('btn-year');


/**
 * ОБЛАСТЬ КАЛЕНДАРЯ
 */
var calendarArea = document.getElementById('calendar');





var dateCurrent = new Date();      // Текущая дата
var dateSelected = new Date();     // Выбранная дата
dateSelected.setFullYear(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate());
var timer; // Общий таймер





// Устанавливаем текущую дату
var setCurrentDate = function(){
    dateCurrent = new Date();
    dateSelected = new Date();
    dateSelected.setFullYear(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate());
}

// Устанавливаем дату на месяц раньше
var setEarlierMonth = function(){
    dateSelected.setMonth(dateSelected.getMonth() - 1);
}

// Устанавливаем дату на месяц позже
var setLaterMonth = function(){
    dateSelected.setMonth(dateSelected.getMonth() + 1);
}

// Устанавливаем месяц по индексу
var setSelectedMonth = function(number){
    dateSelected.setMonth(number);
}

// Получим даты выбранного месяца
var getMonthDay = function(){
    var arrayDays = [];
    var month = dateSelected.getMonth();

    // Создадим коппию выбранной даты
    var date = new Date();
    date.setFullYear(dateSelected.getFullYear(), month, dateSelected.getDate());

    // Установим дату на первое число текущего месяца
    date.setDate(1);

    // Получим первый день недели
    var day = date.getDay() == 0 ? 7 : date.getDay();
    date.setDate(date.getDate() - day + 1);

    // Получим первую неделю
    for(var i=0; i<7; i++){
        arrayDays.push([ date.getFullYear(), date.getMonth(), date.getDate() ]);
        date.setDate(date.getDate() + 1);
    }

    // Пока нужный месяц добавляем неделю в массив
    while(date.getMonth() == month){
        for(var i=0; i<7; i++){
            arrayDays.push([ date.getFullYear(), date.getMonth(), date.getDate() ]);
            date.setDate(date.getDate() + 1);
        }
    }
    return arrayDays;
}

// Получим года для списка
var getListYear = function(){
    var years = [];
    for(var i=(+dateCurrent.getFullYear()-20); i<(+dateCurrent.getFullYear()+50); i++) years.push(i);
    return years;
}

// Получим индекс (id) по дате
var getIndexDate = function(day){
    var m = ('' + day[1]).length == 1 ? '0' + (day[1] + 1) : day[1] + 1 ;
    var d = ('' + day[2]).length == 1 ? '0' + day[2] : day[2] ;

    return [day[0], m, d].join('');
}

// Получим дату в виде массива из индекса
var getDateIndex = function(index){
    var day = [];
    day.push(+index.slice(0,4));
    day.push( +(index[4] == '0' ? index[5] : index.slice(4,6)) - 1 );
    day.push( +(index[6] == '0' ? index[7] : index.slice(6)) );
    return day;
}








// Выводим на экран метку выбранного месяца
var changeLableMonth = function(){
    buttonMonth.innerHTML = listMonth[dateSelected.getMonth()];
}

// Выводим на экран метку выбранного года
var changeLableYear = function(){
    buttonYear.innerHTML = dateSelected.getFullYear();
}

// Показываем сообщения 
var showStatus = function(element, status, message){
    clearInterval(timer);
    element.className = "status";
    element.innerHTML = message;
    element.classList.add(status);

    timer = setInterval(function(){
        element.innerHTML = '';
        element.classList.remove(status);
    }, 5000);
}

// Показываем выбранный месяц
var showSelectedMonth = function(){
    var days = getMonthDay();
    var quantityWeaks = days.length / 7;
    var count = 0;
    var month = days[17][1];
    calendarArea.innerHTML = '';

    for(var j=0; j<quantityWeaks; j++){
        var row = document.createElement('div');
        row.classList.add('row');

        for(var i=0; i<7; i++){
            var col = document.createElement('div');
            col.classList.add('col');
            if( days[count][1] != month ) col.classList.add('unfit');

            var colDate = document.createElement('div');
            colDate.classList.add('col-date');
            
            // Дле первой недели добавим названия дней недели
            if(j==0){
                colDate.innerHTML = listDay[i] + ', ' + days[count][2];
            }
            else {
                colDate.innerHTML = days[count][2];
            }
            col.appendChild(colDate);
            getDateIndex(getIndexDate(days[count]));
            col.setAttribute("index-date", getIndexDate(days[count]));

            count++;
            row.appendChild(col);
        }
        calendarArea.appendChild(row);
    }
}

// Создадим заполнитель POPUP МЕСЯЦ
var createDOMListMonth = function(){
    for(var i=0; i<listMonth.length; i++){
        var item = document.createElement('div');
        item.classList.add('pm-item');
        item.setAttribute('id', 'pm-item')
        item.innerHTML = listMonth[i];
        pupopMonth.appendChild(item);
    }
}

// Выделяем выбранный месяц в списке
var markMonthInList = function(){
    var month = dateSelected.getMonth();

    // Удаляем у всех элементов класс "active"
    for(var i=0; i<listPupopMonth.length; i++){
        listPupopMonth[i].classList.remove('active');
    }

    // Выбранному месяцу добавим класс "active"
    listPupopMonth[month].classList.add('active');
}

// Создадим заполнитель POPUP ГОД
var createDOMListYear = function(){
    var years = getListYear();


}
// createDOMListYear();









/**
 * ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
 */
var refresh = function(){
    changeLableMonth();
    changeLableYear();
    markMonthInList();
    showSelectedMonth();
};
createDOMListMonth();
refresh();












/**
 * POPUP - БЫСТРОЕ ДОБАВЛЕНИЕ
 */
// Нажали на кнопу "Быстрого добавления" 
buttonFastAdd.addEventListener('click', function(e){
    pupopFastAdd.classList.toggle('active');
});

// Нажали на кнопу "Быстрого добавления - Отмена" 
buttonFastAddCancel.addEventListener('click', function(e){
    pupopFastAdd.classList.toggle('active');
    inputFastAdd.value = "";
});

// Нажали на кнопу "Быстрого добавления - Закрыть" 
buttonFastAddClose.addEventListener('click', function(e){
    pupopFastAdd.classList.toggle('active');
});

// Нажали на кнопу "Быстрого добавления - Добавить" 
buttonFastAddSubmit.addEventListener('click', function(e){
    if(inputFastAdd.value == ''){
        showStatus(statusFastAdd, 'error', 'Заполните поле');
    }
    else {
        showStatus(statusFastAdd, 'succses', 'Запись добавлена');
    }
});



/**
 * КНОПКИ СЛЕДУЮЩИЙ МЕСЯЦ, ПРЕДЫДУЩИЙ МЕСЯЦ, СЕГОДНЯ
 */
// Нажали на кнопу "Предыдущий месяц" 
buttonEarlier.addEventListener('click', function(e){
    setEarlierMonth();
    refresh();
});

// Нажали на кнопу "Следующий месяц" 
buttonLater.addEventListener('click', function(e){
    setLaterMonth();
    refresh();
});

// Нажали на кнопу "Сегодня" 
buttonCurrent.addEventListener('click', function(e){
    setCurrentDate();
    refresh();
});





/**
 * КНОПКИ ВЫБРАТЬ МЕСЯЦ, ВЫБРАТЬ ГОД
 */
window.addEventListener('click', function(e){
    // Нажали на кнопу "Название месяца"
    if(e.target == buttonMonth) pupopMonth.classList.toggle('active');
    if(e.target != buttonMonth && pupopMonth.classList.contains('active')) pupopMonth.classList.remove('active');
});



// На выпадающий список месяцев вешаем обработчик нажатия
for(var i=0; i<listPupopMonth.length; i++){
  listPupopMonth[i].addEventListener('click', function(e){
    var indexMonth = listMonth.indexOf(e.target.innerHTML);
    setSelectedMonth(indexMonth);
    refresh();
  });
}




