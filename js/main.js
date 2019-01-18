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

            count++;
            row.appendChild(col);
        }
        calendarArea.appendChild(row);
    }
}





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

// Нажали на кнопу "Предыдущий месяц" 
buttonEarlier.addEventListener('click', function(e){
    setEarlierMonth();
    changeLableMonth();
    changeLableYear();
    showSelectedMonth();
});

// Нажали на кнопу "Следующий месяц" 
buttonLater.addEventListener('click', function(e){
    setLaterMonth();
    changeLableMonth();
    changeLableYear();
    showSelectedMonth();
});

// Нажали на кнопу "Сегодня" 
buttonCurrent.addEventListener('click', function(e){
    setCurrentDate();
    changeLableMonth();
    changeLableYear();
    showSelectedMonth();
});


window.addEventListener('click', function(e){
    console.log(e.target);

    // Нажали на кнопу "Название месяца"
    if(e.target == buttonMonth) pupopMonth.classList.toggle('active');
    if(e.target != buttonMonth && pupopMonth.classList.contains('active')) pupopMonth.classList.remove('active');

});