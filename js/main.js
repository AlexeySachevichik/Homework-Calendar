"use strict"

var listDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var listMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

var buttonFastAdd = document.getElementById('btn-fast-add');
var pupopFastAdd = document.getElementById('popup-fast-add');
var inputFastAdd = document.getElementById('pfa-input');
var statusFastAdd = document.getElementById('pfa-status');
var buttonFastAddSubmit = document.getElementById('pfa-btn-submit');
var buttonFastAddCancel = document.getElementById('pfa-btn-canсel');
var buttonFastAddClose = document.getElementById('pfa-btn-close');


var buttonUpdate = document.getElementById('btn-update');

var inputSerach = document.getElementById('input-search');

var buttonEarlier = document.getElementById('btn-earlier');
var buttonMonth = document.getElementById('btn-month');
var buttonYear = document.getElementById('btn-year');
var buttonLater = document.getElementById('btn-later');
var buttonCurrent = document.getElementById('btn-current');




var
    dateCurrent = new Date(),      // Текущая дата
    dateSelected = dateCurrent,    // Выбранная дата
    timer; // Общий таймер




// Устанавливаем текущую дату
var setCurrentDate = function(){
    dateCurrent = new Date();
    dateSelected = dateCurrent;
}

// Устанавливаем дату на месяц раньше
var setEarlierMonth = function(){
    dateCurrent = new Date();
    dateSelected.setMonth(dateSelected.getMonth() - 1);
}

// Устанавливаем дату на месяц позже
var setLaterMonth = function(){
    dateCurrent = new Date();
    dateSelected.setMonth(dateSelected.getMonth() + 1);
}






// Выводим на экран выбранный месяц
var changeLableMonth = function(){
    buttonMonth.innerHTML = listMonth[dateSelected.getMonth()];
}

// Выводим на экран выбранный год
var changeLableYear = function(){
    buttonYear.innerHTML = dateSelected.getFullYear();
}

// Показываем окно "Быстрого добавления"
var showPupopFastAdd = function(){
    if(!pupopFastAdd.classList.contains('active')){
        pupopFastAdd.classList.add('active');
    }
}

// Скрываем окно "Быстрого добавления"
var hidePupopFastAdd = function(){
    if(pupopFastAdd.classList.contains('active')){
        pupopFastAdd.classList.remove('active');
    }
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






// Нажали на кнопу "Быстрого добавления" 
buttonFastAdd.addEventListener('click', function(e){
    showPupopFastAdd();
});

// Нажали на кнопу "Быстрого добавления - Отмена" 
buttonFastAddCancel.addEventListener('click', function(e){
    hidePupopFastAdd();
    inputFastAdd.value = "";
});

// Нажали на кнопу "Быстрого добавления - Закрыть" 
buttonFastAddClose.addEventListener('click', function(e){
    hidePupopFastAdd();
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
});

// Нажали на кнопу "Следующий месяц" 
buttonLater.addEventListener('click', function(e){
    setLaterMonth();
    changeLableMonth();
    changeLableYear();
});

// Нажали на кнопу "Сегодня" 
buttonCurrent.addEventListener('click', function(e){
    setCurrentDate();
    changeLableMonth();
    changeLableYear();
});



// var dayCurrentLable = listDay[dayCurrent];
// // console.log('dayCurrentLable', dayCurrentLable);

// var numberCurrentLable = numberCurrent + '';
// // console.log('numberCurrentLable', numberCurrentLable);

// var monthCurrentLable = listMonth[monthCurrent];
// // console.log('monthCurrentLable', monthCurrentLable);

// var yearCurrentLable = yearCurrent + '';
// // console.log('yearCurrentLable', yearCurrentLable);
// 
// var View = {

//  // Получим название дня недели (String)
//  getLableDay: function(indexDay){
//      return listDay[ indexDay ];
//  },

//  // Получим название месяца (String)
//  getLableMonth: function(indexMonth){
//      return listMonth[ indexMonth ];
//  },

//  // Получим название года (Number)
//  getLableYear: function(indexYear){
//      return indexYear;
//  },

//  changeLableMonth: function(indexMonth){
//      this.buttonMonth.innerHTML = getLableMonth(indexMonth);
//  },

//  changeLableYear: function(indexYear){
//      this.buttonYear.innerHTML = getLableYear(indexYear);
//  },

// };


// var Model = function(){

//  var dateNow      = new Date();
//  var dateCurrent  = this.getDateNow();
//  // var dayCurrent   = this.dateCurrent.getDate();
//  // var monthCurrent = this.dateCurrent.getMonth();
//  // var yearCurrent  = this.dateCurrent.getFullYear();

//  this.getDateNow = function(){
//      return dateNow;
//  };

//  this.getDateCurrent = function(){
//      return dateCurrent;
//  };
// }

// var model = new Model();



// var Model = {
    
//  dateNow: new Date(),
//  dateCurrent: 0,

//  setDateCurrent: function(date){
//      if(typeof(date) != 'object' || this.dateCurrent == 0) {
//          this.dateCurrent = this.dateNow;
//      }
//      else {
//          this.dateCurrent = date;
//      }
//  },
// };

// var d = new Date(2011, 0, 1, 0, 0, 0, 0);
// console.log(d);

// console.log(Model.dateNow);
// console.log(Model.dateCurrent);
// Model.setDateCurrent(new Date(2011, 0, 1, 0, 0, 0, 0));
// console.log(Model.dateCurrent);




// var Controller = {
// };
// (function(){
// }());