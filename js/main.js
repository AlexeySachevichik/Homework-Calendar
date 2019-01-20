"use strict"

var View = {

    listDay: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    listMonth: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    listMonths: ['января', 'февраля', 'марта', 'апреля', 'майа', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],

    /**
     * БЫСТРОЕ ДОБАВЛЕНИЕ ЗАПИСИ
     */
    buttonFastAdd:       document.getElementById('btn-fast-add'),
    pupopFastAdd:        document.getElementById('popup-fast-add'),
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
    pupopMonth:     document.getElementById('popup-month'),
    listPupopMonth: document.getElementsByClassName('pm-item'),

    /**
     * ВЫБОР ГОДА
     */
    buttonYear:    document.getElementById('btn-year'),
    pupopYear:     document.getElementById('popup-year'),
    listPupopYear: document.getElementsByClassName('py-item'),

    /**
     * ОБЛАСТЬ КАЛЕНДАРЯ
     */
    calendar: document.getElementById('calendar'),

    createDivWithClass: function(name){ // Создадим элемент div с классом
        var element = document.createElement('div');
        element.classList.add(name);
        return element;
    },

    changeLableMonth: function(){ // Меняем метку выбранного месяца
        var month = this.listMonth[ Model.date.getMonth() ];
        this.buttonMonth.innerHTML = month[0].toUpperCase() + month.slice(1);
    },

    createItemsMonth: function(){ // Создаем список месяцев в выпадающем списке
        this.pupopMonth.innerHTML = '';

        for(var i=0; i<this.listMonth.length; i++){
            var item = this.createDivWithClass('pm-item');
            item.setAttribute('id', 'pm-item');

            var month = this.listMonth[i];
            item.innerHTML = month[0].toUpperCase() + month.slice(1);
            this.pupopMonth.appendChild(item);
        }
    },

    markItemMonth: function(){ // Выделяем выбранный месяц в списке

        // Удаляем у всех элементов класс "active"
        for(var i=0; i<this.listPupopMonth.length; i++){
            this.listPupopMonth[i].classList.remove('active');
        }

        // Выбранному месяцу добавим класс "active"
        this.listPupopMonth[ Model.date.getMonth() ].classList.add('active');
    },

    changeLableYear: function(){ // Меняем метку выбранного года
        
        this.buttonYear.innerHTML = Model.date.getFullYear();
    },

    createItemsYear: function(){ // Создаем список годов
        var years = Model.getListYear();
        this.pupopYear.innerHTML = '';

        for(var i=0; i<years.length; i++){
            var item = this.createDivWithClass('py-item');
            item.setAttribute('id', 'py-item');
            item.innerHTML = years[i];
            this.pupopYear.appendChild(item);
        }
    },

    markItemYear: function(){ // Выделяем выбранный месяц в списке

        // Удаляем у всех элементов класс "active", а нужному элементу добавим
        for(var i=0; i<this.listPupopYear.length; i++){

            if( this.listPupopYear[i].innerHTML == Model.date.getFullYear() ) {
                this.listPupopYear[i].classList.add('active');
            }
            else {
                this.listPupopYear[i].classList.remove('active');
            } 
        }
    },

    showSelectedMonth: function(){ // Показываем выбранный месяц
        var days = Model.getDaysCurrentMonth();
        var quantityWeaks = days.length / 7;
        var count = 0;
        var currentMonth = days[17][1];
        
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
                
                // Дле первой недели добавим названия дней недели
                if(j==0) colDate.innerHTML = this.listDay[i] + ', ' + days[count][2];
                else     colDate.innerHTML = days[count][2];

                col.appendChild(colDate);
                
                // Если сегодняшняя дата событие, то добавим класс и покажем даные
                if( Model.ifEvent(days[count]) ) {
                    col.classList.add('event');
                    var colTitle = this.createDivWithClass('col-title');
                    var colDescr = this.createDivWithClass('col-descr');

                    var event = Model.getEvent(days[count]);

                    colTitle.innerHTML = event.title;

                    var mes = ( event.users != '' ) ? event.users : event.descr;
                    colDescr.innerHTML = mes.length>40 ? mes.slice(0, 41) + ' ...' : mes;

                    col.appendChild(colTitle);
                    col.appendChild(colDescr);
                }

                row.appendChild(col);
                count++;
            }
            this.calendar.appendChild(row);
        }
    },

    showStatusFastAdd: function(status, message){ // Показываем статус быстрого добавления записи
        this.statusFastAdd.className = "status";
        this.statusFastAdd.classList.add(status);
        this.statusFastAdd.innerHTML = message;
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

    refresh: function(){ // Обнавление блоков (элементов) при изменении данных
        Model.setCurrentDate();   // Установим текущую дату
        Model.readJsonFile();     // Считываем данные
        View.changeLableMonth();  // Выведем метку месяца
        View.createItemsMonth();  // Создадим список месяцев
        View.markItemMonth();     // Выделим текущий месяц
        View.changeLableYear();   // Выведем метку года
        View.createItemsYear();   // Создадим список годов
        View.markItemYear();      // Выделим текущий год
        View.showSelectedMonth(); // Выведем календарь
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

    splitStrFastAdd: function(str){ // Разбивка строки в быстром добавлении
        var arr = str.split(', ');
        var date = arr[0].split(" ");

        return [date[1].toLowerCase(), +date[0], str.slice( str.indexOf(',') + 2 )];
    },

    ifCorrectFastAdd: function(str){ // Проверим корректность строки
        var data = this.splitStrFastAdd(str);

        if( !(data[1]>0 && data[1]<31) ) return false;
        if( View.listMonths.indexOf( data[0] ) == -1 && View.listMonth.indexOf( data[0] ) == -1) return false;
        return true;
    },

    addEventFastAdd: function(str){ // Добавление новой записи в объект
        var data = this.splitStrFastAdd(str);
        var month;

        if( View.listMonths.indexOf( data[0] ) != -1)     month = View.listMonths.indexOf( data[0] );
        else if( View.listMonth.indexOf( data[0] ) != -1) month = View.listMonth.indexOf( data[0] );

        var index = this.getIndexDate( [this.date.getFullYear(), month, data[1]] );

        this.setSelectedMonth(month);

        if( this.ifEvent(this.getDateIndex(index)) ) return false;
        else {
            this.events[index] = {
                'title': data[2],
                'users': '',
                'descr': '',
            };
            return true;
        }
    },
};





var Controller = {

    clickButtonEarlier: function(){ // Нажали на кнопку "Предыдущий месяц" 
        Model.setEarlierMonth();
        View.changeLableMonth();
        View.markItemMonth();
        View.changeLableYear();
        View.markItemYear();
        View.showSelectedMonth();
    },

    clickButtonLater: function(){ // Нажали на кнопку "Следующий месяц"
        Model.setLaterMonth();
        View.changeLableMonth();
        View.markItemMonth();
        View.changeLableYear();
        View.markItemYear();
        View.showSelectedMonth();
    },

    clickButtonCurrent: function(){ // Нажали на кнопку "Сегодня"
        Model.setCurrentDate();
        View.changeLableMonth();
        View.markItemMonth();
        View.changeLableYear();
        View.markItemYear();
        View.showSelectedMonth();
    },

    clickButtonMonth: function(e){ // Нажали на кнопку "Название месяца"
        if(e.target == View.buttonMonth) View.pupopMonth.classList.toggle('active');
        if(e.target != View.buttonMonth && View.pupopMonth.classList.contains('active')) View.pupopMonth.classList.remove('active');
    },

    clickItemMonth: function(e){ // Нажали на месяц из списка
        var month = e.target.innerHTML;
        var index = View.listMonth.indexOf(month.toLowerCase());
        Model.setSelectedMonth(index);
        View.changeLableMonth();
        View.markItemMonth();
        View.showSelectedMonth();
    },

    clickButtonYear: function(e){ // Нажали на кнопку "Название месяца"
        if(e.target == View.buttonYear) View.pupopYear.classList.toggle('active');
        if(e.target != View.buttonYear && View.pupopYear.classList.contains('active')) View.pupopYear.classList.remove('active');
    },

    clickItemYear: function(e){ // Нажали на месяц из списка
        Model.setSelectedYear( e.target.innerHTML );
        View.changeLableYear();
        View.markItemYear();
        View.showSelectedMonth();
    },

    clickButtonFastAdd: function(){ // Нажали на кнопку "Добавить"
        
        View.pupopFastAdd.classList.toggle('active');
    },

    clickButtonCloseFastAdd: function(){ // Нажали на кнопку "X" Popup Быстрое Добавление 
        View.pupopFastAdd.classList.remove('active');
        View.statusFastAdd.innerHTML = '';
    },

    clickButtonCancelFastAdd: function(){ // Нажали на кнопку "Отмена" Popup Быстрое Добавление
        View.pupopFastAdd.classList.remove('active');
        View.inputFastAdd.value = '';
        View.statusFastAdd.innerHTML = '';
    },

    clickButtonSumbitFastAdd: function(){ // Нажали на кнопку "Добавить" Popup Быстрое Добавление
        var input = View.inputFastAdd.value;

        if( input == '' ) View.showStatusFastAdd('error', 'Заполните поле');

        else if ( Model.ifCorrectFastAdd( input ) ) {
            if( Model.addEventFastAdd( input ) ) {
                View.showStatusFastAdd('succses', 'Данные добавлены');
                View.changeLableMonth();
                View.markItemMonth();
                View.showSelectedMonth();
                input = '';
            }
            else {
                View.showStatusFastAdd('info', 'День занят');
                View.changeLableMonth();
                View.markItemMonth();
                View.showSelectedMonth();
            }
        }
        else View.showStatusFastAdd('error', 'Данные некорректны');
    },

    clickButtonUpdate: function(){ // Нажали на кнопку "Обновить"
        
        Model.refresh();
    },
};





(function(){
    var App = {
        /**
         * ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
         */
        init: function(){
            Model.refresh();

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
            for(var i=0; i<View.listPupopMonth.length; i++){
                View.listPupopMonth[i].addEventListener('click',  function(e){
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
            for(var i=0; i<View.listPupopYear.length; i++){
                View.listPupopYear[i].addEventListener('click',  function(e){
                    Controller.clickItemYear(e);
                });
            }

        },
    };

    App.init();
}());
