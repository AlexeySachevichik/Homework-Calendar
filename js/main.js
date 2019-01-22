"use strict"

var View = {

    listDay: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    listMonth: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    listMonths: ['января', 'февраля', 'марта', 'апреля', 'майа', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],

    /**
     * БЫСТРОЕ ДОБАВЛЕНИЕ ЗАПИСИ
     */
    buttonFastAdd:       document.getElementById('btn-fast-add'),
    popupFastAdd:        document.getElementById('popup-fast-add'),
    inputFastAdd:        document.getElementById('pfa-input'),
    statusFastAdd:       document.getElementById('pfa-status'),
    buttonSubmitFastAdd: document.getElementById('pfa-btn-submit'),
    buttonCancelFastAdd: document.getElementById('pfa-btn-canсel'),
    buttonCloseFastAdd:  document.getElementById('pfa-btn-close'),
    
    /**
     * ОБНОВЛЕНИЕ
     */
    buttonUpdate: document.getElementById('btn-update'),

    /**
     * ПОИСК
     */
    inputSerach: document.getElementById('input-search'),
    resultSerach: document.getElementById('search-result'),
    itemSearch: document.getElementsByClassName('sr-item'),

    /**
     * МЕСЯЦ РАНЕЕ, МЕСЯЦ ПОЗЖЕ, СЕГОДНЯ
     */
    buttonEarlier: document.getElementById('btn-earlier'),
    buttonLater:   document.getElementById('btn-later'),
    buttonCurrent: document.getElementById('btn-current'),

    /**
     * ВЫБОР МЕСЯЦА
     */
    buttonMonth:    document.getElementById('btn-month'),
    popupMonth:     document.getElementById('popup-month'),
    listPopupMonth: document.getElementsByClassName('pm-item'),

    /**
     * ВЫБОР ГОДА
     */
    buttonYear:    document.getElementById('btn-year'),
    popupYear:     document.getElementById('popup-year'),
    listPopupYear: document.getElementsByClassName('py-item'),

    /**
     * ОБЛАСТЬ КАЛЕНДАРЯ
     */
    calendar: document.getElementById('calendar'),
    colsCalendar: document.getElementsByClassName('col'),
    
    /**
     * ДОБАВЛЕНИЕ ЗАПИСИ
     */
    popupAdd:        document.getElementById('popup-add'),
    headerAdd:       document.getElementById('pa-header'),
    inputTitleAdd:   document.getElementById('pa-input-title'),
    inputUserAdd:    document.getElementById('pa-input-users'),
    textareaAdd:     document.getElementById('pa-descr'),
    statusAdd:       document.getElementById('pa-status'),
    buttonSubmitAdd: document.getElementById('pa-btn-sumbit'),
    buttonCancelAdd: document.getElementById('pa-btn-cancel'),
    buttonCloseAdd:  document.getElementById('pa-btn-close'),

    /**
     * РЕДАКТИРОВАНИЕ ЗАПИСИ
     */
    popupEdit:        document.getElementById('popup-edit'),
    headerEdit:       document.getElementById('pe-header'),
    dateEdit:         document.getElementById('pe-date'),
    lableEdit:        document.getElementById('pe-user'),
    inputUserEdit:    document.getElementById('pe-input-users'),
    usersEdit:        document.getElementById('pe-users'),
    textareaEdit:     document.getElementById('pe-descr'),
    statusEdit:       document.getElementById('pe-status'),
    buttonSubmitEdit: document.getElementById('pe-btn-sumbit'),
    buttonDeleteEdit: document.getElementById('pe-btn-delete'),
    buttonCloseEdit:  document.getElementById('pe-btn-close'),

    //
    createDivWithClass: function(name){ // Создадим элемент div с классом
        var element = document.createElement('div');
        element.classList.add(name);
        return element;
    },

    //
    changeLableMonth: function(){ // Меняем метку выбранного месяца
        var month = this.listMonth[ Model.date.getMonth() ];
        this.buttonMonth.innerHTML = month[0].toUpperCase() + month.slice(1);
    },

    //
    createItemsMonth: function(){ // Создаем список месяцев в выпадающем списке
        this.popupMonth.innerHTML = '';

        for(var i=0; i<this.listMonth.length; i++){

            var item = this.createDivWithClass('pm-item');
            var month = this.listMonth[i];

            item.setAttribute('id', 'pm-item');
            item.innerHTML = month[0].toUpperCase() + month.slice(1);

            this.popupMonth.appendChild(item);
        }
    },

    //
    markItemMonth: function(){ // Выделяем выбранный месяц в списке

        // Удаляем у всех элементов класс "active"
        for(var i=0; i<this.listPopupMonth.length; i++){

            this.listPopupMonth[i].classList.remove('active');
        }

        // Выбранному месяцу добавим класс "active"
        this.listPopupMonth[ Model.date.getMonth() ].classList.add('active');
    },

    //
    changeLableYear: function(){ // Меняем метку выбранного года
        
        this.buttonYear.innerHTML = Model.date.getFullYear();
    },

    //
    createItemsYear: function(){ // Создаем список годов
        var years = Model.getListYear();

        this.popupYear.innerHTML = '';

        for(var i=0; i<years.length; i++){

            var item = this.createDivWithClass('py-item');

            item.setAttribute('id', 'py-item');
            item.innerHTML = years[i];

            this.popupYear.appendChild(item);
        }
    },

    //
    markItemYear: function(){ // Выделяем выбранный месяц в списке

        // Удаляем у всех элементов класс "active", а нужному элементу добавим
        for(var i=0; i<this.listPopupYear.length; i++){

            if( this.listPopupYear[i].innerHTML == Model.date.getFullYear() ) {
                
                this.listPopupYear[i].classList.add('active');
            }
            else {
                this.listPopupYear[i].classList.remove('active');
            } 
        }
    },

    //
    showSelectedMonth: function(){ // Показываем выбранный месяц
        var days = Model.getDaysCurrentMonth();
        var quantityWeaks = days.length / 7;
        var count = 0;
        var currentMonth = days[17][1];
        
        this.colsCalendar = [];        
        this.calendar.innerHTML = '';

        for(var j=0; j<quantityWeaks; j++){
            var row = this.createDivWithClass('row');

            for(var i=0; i<7; i++){
                var col = this.createDivWithClass('col');
                col.setAttribute("date-index", Model.getIndexDate(days[count]));

                // Если дата не относиться к текущему месяцу добавим класс
                if( days[count][1] != currentMonth ) col.classList.add('unfit');

                // Если сегодняшняя дата, то добавим класс
                if( Model.ifToday(days[count]) ) col.classList.add('current');

                // Елемент с датой
                var colDate = this.createDivWithClass('col-date');
                
                // Для первой недели добавим названия дней недели
                if(j==0) colDate.innerHTML = this.listDay[i] + ', ' + days[count][2];
                else     colDate.innerHTML = days[count][2];

                col.appendChild(colDate);
                
                // Если сегодняшняя дата это событие, то добавим класс и покажем даные
                if( Model.ifEvent(days[count]) ) {
                    col.classList.add('event');

                    var colTitle = this.createDivWithClass('col-title');
                    var colDescr = this.createDivWithClass('col-descr');

                    var event = Model.getEvent(days[count]);
                    var mes = ( event.users != '' ) ? event.users : event.descr;

                    colTitle.innerHTML = event.title;
                    colDescr.innerHTML = mes.length>40 ? mes.slice(0, 41) + ' ...' : mes;

                    col.appendChild(colTitle);
                    col.appendChild(colDescr);
                }

                row.appendChild(col);
                count++;
            }
            this.calendar.appendChild(row);
        }

        Model.refreshColsEvent(); // Обнавление события клика на ячейках дней
    },

    showStatusFastAdd: function(status, message){ // Показываем статус быстрого добавления записи
        this.statusFastAdd.className = "status";
        this.statusFastAdd.classList.add(status);
        this.statusFastAdd.innerHTML = message;
    },

    showStatusAdd: function(status, message){ // Показываем статус добавления записи
        this.statusAdd.className = "status";
        this.statusAdd.classList.add(status);
        this.statusAdd.innerHTML = message;
    },

    removeMarkColCalendar: function(){ // У всех ячеек уберем фокус
        for(var i=0; i<this.colsCalendar.length; i++){
            this.colsCalendar[i].classList.remove('focus');
        }
    },

    markColCalendar: function(e){ // Фокусируем выбранную ячейку

        // Выбранную ячейку "фокусим"
        e.classList.add('focus');
    },

    showPopupAdd: function(e){ // Показываем окно добавления записи
        var date = Model.getDateIndex( e.getAttribute('date-index'));
        var month = this.listMonths[ date[1] ];
        this.headerAdd.innerHTML = date[2] + ' ' + month[0].toUpperCase() + month.slice(1);

        this.statusAdd.innerHTML = '';
        this.popupAdd.classList.add('active');
        this.popupAdd.setAttribute('date-index', e.getAttribute('date-index'));
    },

    hidePopupAdd: function(){ // Скрываем окно добавления записи
        this.popupAdd.classList.remove('active');
        this.inputTitleAdd.value = '';
        this.inputUserAdd.value = '';
        this.textareaAdd.value = '';
        this.headerAdd.innerHTML = '';
    },

    showPopupEdit: function(e){ // Показываем окно редактирования записи
        var index = e.getAttribute('date-index');
        var date  = Model.getDateIndex( index );
        var event = Model.getEvent( date );
        var month = this.listMonths[ date[1] ];

        this.headerEdit.innerHTML = event.title;
        this.dateEdit.innerHTML = date[2] + ' ' + month[0].toUpperCase() + month.slice(1);
        this.inputUserEdit.value = '';

        if( event.users != '' ) {
            this.inputUserEdit.style.display = 'none';
            this.lableEdit.style.display = 'block';
            this.usersEdit.innerHTML = event.users;
        }
        else {
            this.inputUserEdit.style.display = 'block';
            this.lableEdit.style.display = 'none';
        }
        
        this.textareaEdit.value = event.descr; 

        this.popupEdit.classList.add('active');
        this.popupEdit.setAttribute('date-index', index);
    },

    hidePopupEdit: function(){ // Скрываем окно редактирования записи
        this.popupEdit.classList.remove('active');
        this.headerEdit.innerHTML = '';
        this.dateEdit.innerHTML   = '';
        this.usersEdit.innerHTML  = '';
        this.textareaEdit.value   = '';
    },

    showSearchResult: function(result){ // Показываем список поиска
        this.resultSerach.innerHTML = '';
        this.resultSerach.classList.add('active');

        for(var i=0; i<result.length; i++){
            var day = Model.getDateIndex(result[i]);

            var item  = this.createDivWithClass('sr-item');
            item.setAttribute("date-index", result[i]);
            var title = this.createDivWithClass('sri-title');
            var date  = this.createDivWithClass('sri-date');

            title.innerHTML = Model.events[result[i]].title;

            var month = this.listMonths[ day[1] ];
            date.innerHTML  = '' + day[2] + ' ' + month[0].toUpperCase() + month.slice(1) + ' ' + day[0];

            item.appendChild(title);
            item.appendChild(date);
            this.resultSerach.appendChild(item);
        };

        Model.refreshItemSearch();
    },

    hideSearchResult: function(){
        this.resultSerach.innerHTML = '';
        this.resultSerach.classList.remove('active');
    },

    onfocusSearch: function(){
        this.inputSerach.value = '';
        this.resultSerach.innerHTML = '';
        this.resultSerach.classList.remove('active');
    },

    showPopupFastAdd: function(){
        
        this.popupFastAdd.classList.add('active');
    },

    hidePopupFastAdd: function(){
        this.popupFastAdd.classList.remove('active');
        this.statusFastAdd.innerHTML = '';
        this.inputFastAdd.value = '';
    },

    showPopupMonth: function(){
        
        View.popupMonth.classList.add('active');
    },

    hidePopupMonth: function(){

        View.popupMonth.classList.remove('active');
    },

    showPopupYear: function(){
        
        View.popupYear.classList.add('active');
    },

    hidePopupYear: function(){

        View.popupYear.classList.remove('active');
    },
};




var Model = {

    date: new Date(), // Текущая дата

    events: {}, // Обьект с событиями

    readJsonFile: function(){ // Сделаем удобочитаемый объект
        var list = JSON.parse(FILE);

        for(var i=0; i<list.length; i++) {
            var key = list[i].date;
            this.events[key] = {
                'title': list[i].title,
                'users': list[i].users,
                'descr': list[i].descr
            };
        };

        // console.log(this.events);
    },

    ifToday: function(day){ // Если дата сегодня
        var dateTemp = new Date();
        var year  = dateTemp.getFullYear();
        var month = dateTemp.getMonth();
        var date  = dateTemp.getDate();

        if( day[0] == year && day[1] == month && day[2] ==  date ) return true;
        else return false;
    },

    ifEvent: function(day){ // Если дата событие
        if(this.getIndexDate(day) in this.events) return true;
        else return false;
    },

    getEvent: function(day){ // Получим данные события
        
        return this.events[this.getIndexDate(day)];
    },

    setCurrentDate: function(){ // Устанавливим текущую дату
        
        this.date = new Date();
    },

    setSelectedMonth: function(i){ // Устанавливим месяц по номеру
        
        this.date.setMonth(i);
    },

    setSelectedYear: function(i){ // Устанавливим год по номеру
        
        this.date.setFullYear(i);
    },

    setEarlierMonth: function(){ // Устанавливим дату на месяц раньше
        
        this.date.setMonth( this.date.getMonth() - 1 );
    },

    setLaterMonth: function(){ // Устанавливим дату на месяц позже
        
        this.date.setMonth( this.date.getMonth() + 1 );
    },

    getDaysCurrentMonth: function(){ // Получим массив дат выбранного месяца
        var days = [];
        var month = this.date.getMonth();
        var dateTemp = new Date(); // Создадим коппию выбранной даты

        // Установим дату на первое число выбранного месяца
        dateTemp.setFullYear(this.date.getFullYear(), month, 1);

        // Получим первый день недели
        var day = dateTemp.getDay() == 0 ? 7 : dateTemp.getDay();
        dateTemp.setDate(dateTemp.getDate() - day + 1);

        // Получим первую неделю
        for(var i=0; i<7; i++){
            days.push([ dateTemp.getFullYear(), dateTemp.getMonth(), dateTemp.getDate() ]);
            dateTemp.setDate(dateTemp.getDate() + 1);
        }

        // Пока нужный месяц добавляем по-недельно в массив
        while(dateTemp.getMonth() == month){
            for(var i=0; i<7; i++){
                days.push([ dateTemp.getFullYear(), dateTemp.getMonth(), dateTemp.getDate() ]);
                dateTemp.setDate(dateTemp.getDate() + 1);
            }
        }
        return days;
    },

    getIndexDate: function(day){ // Преобразуем дату из массива в индекс
        var m = ('' + day[1]).length == 1 ? '0' + (day[1] + 1) : day[1] + 1 ;
        var d = ('' + day[2]).length == 1 ? '0' + day[2] : day[2] ;
        return [day[0], m, d].join('');
    },

    getDateIndex: function(index){ // Преобразуем дату из индекса в массив
        var day = [];
        day.push(+index.slice(0,4));
        day.push( +(index[4] == '0' ? index[5] : index.slice(4,6)) - 1 );
        day.push( +(index[6] == '0' ? index[7] : index.slice(6)) );
        return day;
    },

    getListYear: function(){ // Получим года для списка
        var years = [];
        for(var i=(+this.date.getFullYear()-20); i<(+this.date.getFullYear()+50); i++) years.push(i);
        return years;
    },

    // readJsonFile: function(){ // Прочтем данные из файла .json
    //     var xhr = new XMLHttpRequest();
    //     xhr.overrideMimeType("application/json");
    //     xhr.open('GET', '/data/events.json', true);

    //     xhr.onreadystatechange = function() {
    //         // Запрос завершен и ответ сервера 200, то все ок
    //         if (xhr.readyState === 4 && xhr.status == 200) {
    //             Model.readJsonObject(xhr.responseText);
    //         };
    //     };
    //     xhr.send(null);
    // },

    // readJsonObject: function(p){ // Данные из файла .json поместим в обьект
    //     var o = JSON.parse(p);
    //     o.forEach(function(i){
    //         Model.events[i.date] = i;
    //     });
    // },

    splitStrFastAdd: function(str){ // Разбивка строки при быстром добавлении

        var arr = str.split(', ');
        var temp = arr[0].split(" ");

        if(temp.length < 2)return false;

        var data = [];
        for( var i=0; i<temp.length; i++ ){
            if( temp[i] != ''){
                data.push( temp[i].trim() );
            }
        }

        if(data.length < 2)return false;

        data[1].toLowerCase();
        var month = false;

        if ( View.listMonths.indexOf( data[1] ) != -1 ) month = View.listMonths.indexOf( data[1] );
        else if( View.listMonth.indexOf(  data[1] ) != -1 ) month = View.listMonth.indexOf ( data[1] );
        else return false;

        return [Model.date.getFullYear(), month, +data[0], str.slice( str.indexOf(',') + 2 ).trim()];
    },

    ifDayBelongMonth: function(day){ // Есть ли указанное число в месяце
        var date = new Date(day[0], day[1] + 1, 1);

        // Установим посленний день месяца
        date.setDate( date.getDate() - 1 );

        return date.getDate() >= day[2] ? false : true ;
    },

    ifCorrectFastAdd: function(day){ // Проверим корректность строки
       
        if( day[1] === false ) return false;
        if( !(day[2]>0 && day[2]<32) ) return false;
        if( this.ifDayBelongMonth(day.slice(0,3)) ) return false;
        return true;
    },

    saveEventFastAdd: function(str){ // Добавление новой записи в объект
        var data = this.splitStrFastAdd(str);

        if( this.ifCorrectFastAdd(data) ){
            var index = this.getIndexDate( [data[0], data[1], data[2]] );

            this.setSelectedMonth(data[1]);

            if( this.ifEvent(this.getDateIndex(index)) ) return 'busy';
            else {
                this.events[index] = {
                    'title': data[3],
                    'users': '',
                    'descr': '',
                };
                return true;
            }
        }
    },

    refreshColsEvent: function(){ // Обнавление события клика на ячейках дней
        View.colsCalendar = document.getElementsByClassName('col');

        for(var i=0; i<View.colsCalendar.length; i++){

            View.colsCalendar[i].addEventListener('click', function(e){
                Controller.clickColCalendar(e);
            });
        }
    },

    setCoordinates: function(popup, col, par){ // Установим координаты popup окна

        var parent = {
            right:  Math.round(par.right + 20),
            bottom: Math.round(par.bottom - 20),
        };

        var cellar = {
            left:   Math.round(col.left - 10),
            right:  Math.round(col.right + 10),
            top:    Math.round(col.top + 10),
        }

        var widthPopup = 300;
        var heightPopup = 375;

        if( (parent.right - cellar.right) > widthPopup ){
            popup.style.left = cellar.right + 'px';
        }
        else {
            popup.style.left = cellar.left - widthPopup + 'px';
        }

        if( (parent.bottom - cellar.top) > heightPopup ){
            popup.style.top = cellar.top + 'px';
        }
        else {
            popup.style.top = parent.bottom - heightPopup + 'px';
        }
    },

    deleteEvent: function(index){ // Удаление события

        delete this.events[index];
    },

    saveNewEvent: function(index, data){ // Добавим новое событие
        this.events[index] = {
            'title': data[0],
            'users': data[1],
            'descr': data[2],
        };
    },

    saveEvent: function(index, data){ // Сохраним новое событие

        if( data[0] != '' ) this.events[index]['users'] = data[0];
        if( data[1] != '' ) this.events[index]['descr'] = data[1];
    },

    searchEvents: function(str) { // Поиск событий по строке
        if(str == '' || typeof(str) != 'string') return false;
        var strArr = str.split(" ");
        var result = {};

        for(var i=0; i<strArr.length; i++){
            strArr[i] = ("" + strArr[i]).toLowerCase();

            newEvent:
            for( var key in this.events ){

                var date = this.getDateIndex(key);

                if( ('' + date[0]) == strArr[i] ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;

                    continue newEvent;
                }
                else if( View.listMonths[ date[1] ].indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
                else if( View.listMonth [ date[1] ].indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
                else if( ('' + date[2]).indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
                else if( this.events[key].title.toLowerCase().indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
                else if( this.events[key].users.toLowerCase().indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
                else if( this.events[key].descr.toLowerCase().indexOf(strArr[i]) != -1 ){
                    if( result[key] !== undefined ) result[key]++;
                    else result[key] = 1;
                    continue newEvent;
                }
            }
        }

        var searchIndex = [];

        for( var key in result ){
            if( result[key] == strArr.length ) searchIndex.push(key);
        }

        return searchIndex.length < 1 ? false : searchIndex;
    },

    refreshItemSearch: function(){ // Обнавление события клика на списке поиска
        View.itemSearch = document.getElementsByClassName('sr-item');

        for(var i=0; i<View.itemSearch.length; i++){

            View.itemSearch[i].addEventListener('click', function(e){
                Controller.clickItemSearch(e);
            });
        }
    },

};





var Controller = {

    clickButtonEarlier: function(){ // Нажали на кнопку "Предыдущий месяц"

        Model.setEarlierMonth();        // Установим на месяц раньше

        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickButtonLater: function(){ // Нажали на кнопку "Следующий месяц"
        
        Model.setLaterMonth();          // Установим на месяц позже

        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickButtonCurrent: function(){ // Нажали на кнопку "Сегодня"
       
        Model.setCurrentDate();         // Установим текущую дату
        
        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickButtonMonth: function(e){ // Нажали на кнопку "Название месяца"

        if(e.target == View.buttonMonth){

            View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
            View.onfocusSearch();           // Уберем результаты поиска и очистим поле
            View.hidePopupAdd();            // Скроем окно добавления
            View.hidePopupEdit();           // Скроем окно редактирования
            View.hidePopupFastAdd();        // Скроем окно быстрого добавления

            if( View.popupMonth.classList.contains('active') ){
                View.hidePopupMonth();       // Скроем список месяцев
            }
            else {
                View.showPopupMonth();       // Покажем список месяцев
            }
        };
        if(e.target != View.buttonMonth && View.popupMonth.classList.contains('active')){
             View.hidePopupMonth();       // Скроем список месяцев
        };
    },

    clickItemMonth: function(e){ // Нажали на месяц из списка

        var month = e.target.innerHTML;
        var index = View.listMonth.indexOf(month.toLowerCase());

        Model.setSelectedMonth(index);  // Установим на выбранный месяц

        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями
    },

    clickButtonYear: function(e){ // Нажали на кнопку "Название года"

        if(e.target == View.buttonYear) {

            View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
            View.onfocusSearch();           // Уберем результаты поиска и очистим поле
            View.hidePopupAdd();            // Скроем окно добавления
            View.hidePopupEdit();           // Скроем окно редактирования
            View.hidePopupFastAdd();        // Скроем окно быстрого добавления

            if( View.popupYear.classList.contains('active') ){
                View.hidePopupYear();       // Скроем список годов
            }
            else {
                View.showPopupYear();       // Покажем список годов
            }
        };
        if(e.target != View.buttonYear && View.popupYear.classList.contains('active')){
            View.hidePopupYear();       // Скроем список годов
        };
    },

    clickItemYear: function(e){ // Нажали на год из списка
        
        Model.setSelectedYear( e.target.innerHTML );
        
        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями
    },

    clickButtonFastAdd: function(){ // Нажали на кнопку "Добавить"

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        
        if( View.popupFastAdd.classList.contains('active') ){
            View.hidePopupFastAdd();        // Скроем окно быстрого добавления
        }
        else {
            View.showPopupFastAdd();        // Покажем окно быстрого добавления
        }
    },

    clickButtonCloseFastAdd: function(){ // Нажали на кнопку "X" Popup Быстрое Добавление 
        
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickButtonCancelFastAdd: function(){ // Нажали на кнопку "Отмена" Popup Быстрое Добавление
        
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickButtonSumbitFastAdd: function(){ // Нажали на кнопку "Добавить" Popup Быстрое Добавление
        var input = View.inputFastAdd.value;

        if( input == '' ) View.showStatusFastAdd('error', 'Заполните поле');
        else {

            var respond = Model.saveEventFastAdd(input);

            if( respond == 'busy' ) {
                View.showStatusFastAdd('info', 'День занят');
                View.changeLableMonth();
                View.markItemMonth();
                View.showSelectedMonth();
            }
            else if( respond && respond != 'busy' ) {
                View.showStatusFastAdd('succses', 'Данные добавлены');
                View.changeLableMonth();
                View.markItemMonth();
                View.showSelectedMonth();
                input = '';
            }
            else View.showStatusFastAdd('error', 'Данные некорректны');
        };
    },

    clickButtonUpdate: function(){ // Нажали на кнопку "Обновить"
        Model.events = {};

        Model.setCurrentDate();         // Установим текущую дату
        
        View.changeLableMonth();        // Поменяем название месяца
        View.changeLableYear();         // Поменяем номер года
        View.markItemMonth();           // Отметим месяц в списке
        View.markItemYear();            // Отметим год в списке
        View.showSelectedMonth();       // Выведем сетку календаря с событиями

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    clickColCalendar: function(e){ // Нажали на ячейку календаря

        // Если кликнули на дочерние элементы, выбирем ячейку
        if( !e.target.classList.contains('col')) var col = e.target.parentNode;
        else var col = e.target;

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.onfocusSearch();           // Уберем результаты поиска и очистим поле
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
        
        // Если ячейка в фокусе
        if(!col.classList.contains('focus')) {

            View.markColCalendar(col);      // Отмечам ячейку

            if(col.classList.contains('event')) {
                Model.setCoordinates(
                    View.popupEdit,
                    col.getBoundingClientRect(),
                    col.parentNode.parentNode.getBoundingClientRect()
                );
                View.showPopupEdit(col);        // Показываем окно редактирования
            }
            else {
                Model.setCoordinates(
                    View.popupAdd,
                    col.getBoundingClientRect(),
                    col.parentNode.parentNode.getBoundingClientRect()
                );
                View.showPopupAdd(col);         // Показываем окно добавления
            }
        }
    },

    clickButtonCloseAdd: function(){ // Нажали на кнопку "X" Popup Добавление
        
        View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
        View.hidePopupAdd(); // Скрываем Popup и очищаем поля
    },

    clickButtonCancelAdd: function(){ // Нажали на кнопку "Отмена" Popup Добавление
        
        View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
        View.hidePopupAdd(); // Скрываем Popup и очищаем поля
    },

    clickButtonSumbitAdd: function(e){ // Нажали на кнопку "Добавить" Popup Добавление
        var popup = e.target.parentNode.parentNode;
        var index = popup.getAttribute('date-index');

        if( View.inputTitleAdd.value == '' ) View.showStatusAdd('error', 'Заполните поле "Событие"');
        else {
            var data = [
                View.inputTitleAdd.value,
                View.inputUserAdd.value,
                View.textareaAdd.value
            ];

            Model.saveNewEvent(index, data);

            View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
            View.hidePopupAdd(); // Скрываем Popup и очищаем поля
            View.showSelectedMonth();
        };
    },

    clickButtonCloseEdit: function(){ // Нажали на кнопку "X" Popup Редактирование
        View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
        View.hidePopupEdit();         // Скрываем Popup Редактирования и очищаем поля
    },

    clickButtonDeleteEdit: function(e){ // Нажали на кнопку "Удалить" Popup Редактирование
        var popup = e.target.parentNode.parentNode;
        var index = popup.getAttribute('date-index');

        Model.deleteEvent(index);

        View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
        View.hidePopupEdit();         // Скрываем Popup Редактирования и очищаем поля
        View.showSelectedMonth();
    },

    clickButtonSumbitEdit: function(e){ // Нажали на кнопку "Сохранить" Popup Редактирование
        var popup = e.target.parentNode.parentNode;
        var index = popup.getAttribute('date-index');

        if( View.inputUserEdit.style.display == 'block' ){
            var users = View.inputUserEdit.value;
        }
        else if( View.lableEdit.style.display == 'block'){
            var users = View.usersEdit.innerHTML;
        }

        var data = [ users, View.textareaEdit.value];

        Model.saveEvent(index, data);

        View.removeMarkColCalendar(); // Убираем фокус со всех ячеек
        View.hidePopupEdit();         // Скрываем Popup Редактирования и очищаем поля
        View.showSelectedMonth();
    },

    focusInputSerach: function(){ // При фокусировке на поле поиска скрываем все окна

        View.removeMarkColCalendar();   // Уберем фокус на ячейке дня
        View.hidePopupAdd();            // Скроем окно добавления
        View.hidePopupEdit();           // Скроем окно редактирования
        View.hidePopupFastAdd();        // Скроем окно быстрого добавления
    },

    keyupInputSerach: function(){ // Изменение поля поиска
        
        Model.refreshItemSearch();

        var result = Model.searchEvents( View.inputSerach.value );

        if( result ) {
            View.showSearchResult(result); // вывод результатов
        }
        else {
            View.hideSearchResult(); // спрятать результаты
        }
    },

    clickItemSearch: function(e){ // Кликнули на элемент из списка поиска

        // Если кликнули на дочерние элементы, выбирем ячейку
        if( !e.target.classList.contains('sr-item')) var item = e.target.parentNode;
        else var item = e.target;

        var index = item.getAttribute("date-index");
        var day = Model.getDateIndex(index);

        console.log(index);
        console.log(day);
    },
};



(function(){
    var App = {
        /**
         * ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
         */
        init: function(){

            Model.readJsonFile();           // Считываем данные
            Model.setCurrentDate();         // Установим текущую дату

            View.createItemsYear();         // Создадим список годов
            View.createItemsMonth();        // Создадим список месяцев
        
            View.changeLableMonth();        // Поменяем название месяца
            View.changeLableYear();         // Поменяем номер года
            View.markItemMonth();           // Отметим месяц в списке
            View.markItemYear();            // Отметим год в списке
            View.showSelectedMonth();       // Выведем сетку календаря с событиями

            this.main();
            this.event();
        },
        main: function(){},
        event: function(){

            /**
             * КНОПКА ДОБАВИТЬ
             */
            // Нажали на кнопку "Добавить"
            View.buttonFastAdd.addEventListener('click', Controller.clickButtonFastAdd);


            /**
             * КНОПКА ОБНОВИТЬ
             */
            // Нажали на кнопку "Обновить"
            View.buttonUpdate.addEventListener('click', Controller.clickButtonUpdate);


            /**
             * POPUP БЫСТРО ДОБАВИТЬ
             */
            // Нажали на кнопку "X" Popup Быстрое Добавление
            View.buttonCloseFastAdd.addEventListener('click', Controller.clickButtonCloseFastAdd);

            // Нажали на кнопку "Отмена" Popup Быстрое Добавление
            View.buttonCancelFastAdd.addEventListener('click', Controller.clickButtonCancelFastAdd);

            // Нажали на кнопку "Добавить" Popup Быстрое Добавление
            View.buttonSubmitFastAdd.addEventListener('click', Controller.clickButtonSumbitFastAdd);


            /**
             * КНОПКИ СЛЕДУЮЩИЙ МЕСЯЦ, ПРЕДЫДУЩИЙ МЕСЯЦ, СЕГОДНЯ
             */
            // Нажали на кнопку "Предыдущий месяц"
            View.buttonEarlier.addEventListener('click', Controller.clickButtonEarlier);

            // Нажали на кнопку "Следующий месяц"
            View.buttonLater.addEventListener('click', Controller.clickButtonLater);

            // Нажали на кнопку "Сегодня"
            View.buttonCurrent.addEventListener('click', Controller.clickButtonCurrent);


            /**
             * КНОПКА ВЫБРАТЬ МЕСЯЦ
             */
            // Нажали на кнопку "Название месяца"
            window.addEventListener('click', function(e){
               Controller.clickButtonMonth(e); 
            });

            // На список месяцев вешаем обработчик клика
            for(var i=0; i<View.listPopupMonth.length; i++){
                View.listPopupMonth[i].addEventListener('click',  function(e){
                    Controller.clickItemMonth(e);
                });
            }


            /**
             * КНОПКА ВЫБРАТЬ ГОД
             */
            // Нажали на кнопку "Номер года"
            window.addEventListener('click', function(e){
               Controller.clickButtonYear(e);
            });

            // На список месяцев вешаем обработчик клика
            for(var i=0; i<View.listPopupYear.length; i++){
                View.listPopupYear[i].addEventListener('click',  function(e){
                    Controller.clickItemYear(e);
                });
            }


            /**
             * НАЖАЛИ НА ЛЮБУЮ ЯЧЕЙКУ ДНЕЙ
             */
            // На ячейки дней вешаем обработчик клика
            // Model.refreshColsEvent(); // Обнавление события клика на ячейках дней


            /**
             * POPUP ДОБАВИТЬ
             */
            // Нажали на кнопку "X" Popup Добавление
            View.buttonCloseAdd.addEventListener('click', Controller.clickButtonCloseAdd);

            // Нажали на кнопку "Отмена" Popup Добавление
            View.buttonCancelAdd.addEventListener('click', Controller.clickButtonCancelAdd);

            // Нажали на кнопку "Добавить" Popup Добавление
            View.buttonSubmitAdd.addEventListener('click', function(e){
                Controller.clickButtonSumbitAdd(e);
            });


            /**
             * POPUP РЕДАКТИРОВАТЬ
             */
            // Нажали на кнопку "X" Popup Редактирование
            View.buttonCloseEdit.addEventListener('click', Controller.clickButtonCloseEdit);

            // Нажали на кнопку "Удалить" Popup Редактирование
            View.buttonDeleteEdit.addEventListener('click', function(e){
                Controller.clickButtonDeleteEdit(e);
            });

            // Нажали на кнопку "Сохранить" Popup Редактирование
            View.buttonSubmitEdit.addEventListener('click', function(e){
                Controller.clickButtonSumbitEdit(e);
            });


            /**
             * ПОИСК
             */
            // Кликнули на поле поиска
            View.inputSerach.addEventListener('focus', Controller.focusInputSerach);

            // Изменили value поиска
            View.inputSerach.addEventListener('keyup', Controller.keyupInputSerach);
        },
    };

    App.init();
}());
