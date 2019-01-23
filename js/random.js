"use strict"

var Random = {

    word: function word(){
        var str = 'не следует однако забывать что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу специалистов участие в формировании существенных финансовых и административных условий не следует однако забывать что постоянный количественный рост и сфера нашей активности в значительной степени обуславливает создание позиций занимаемых участниками в отношении поставленных задач таким образом дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание новых предложений разнообразный и богатый опыт реализация намеченных плановых заданий представляет собой интересный эксперимент проверки системы обучения кадров соответствует насущным потребностям';
        return str.split(" ");
    },

    name: function(){
        var str = 'Алёна Александр Алексей Анастасия Андрей Анна Антон Борис Вадим Валентин Варвара Василий Виктория Виталий Владимир Дарья Дмитрий Евгений Екатерина Елена Иван Илья Ира Кирилл Ксения Максим Марина Мария Михаил Ника Николай Олег Ольга Павел Полина Рената Руслан Сергей Степан Татьяна Юлия Юрий Ярослав';
        return str.split(" ");
    },

    surname: function(){
        var str = 'Иванов Смирнов Кузнецов Попов Васильев Петров Соколов Михайлов Новиков Фёдоров Морозов Волков Алексеев Лебедев Семёнов Егоров Павлов Козлов Степанов Николаев Орлов Андреев Макаров Никитин Захаров';
        return str.split(" ");
    },
    
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    year: function year(){
        return '' + this.getRandomInt(2017, 2021);
    },

    month: function month(){
        var m = this.getRandomInt(1, 12);
        return ( m > 9 ) ? ''+m : '0'+m;
    },

    day: function day(){
        var d = this.getRandomInt(1, 28);
        return ( d > 9 ) ? ''+d : '0'+d;
    },

    title: function(){
        var words = this.word();
        var value = this.getRandomInt(1, 3);
        var result = '';

        for(var i=0; i<value; i++ ){

            if( i == value-1){
                result += words[this.getRandomInt(0, words.length-1)];
            }
            else{
                result += words[this.getRandomInt(0, words.length-1)] + ' ';
            }
            
        };
        return result;
    },

    users: function(){
        var name = this.name();
        var surname = this.surname();
        var value = this.getRandomInt(0, 3);
        var result = '';

        if( value == 0) return '';

        for(var i=0; i<value; i++ ){

            if( i == value-1){
                result += name[this.getRandomInt(0, name.length-1)] + ' ' + surname[this.getRandomInt(0, surname.length-1)];
            }
            else{
                result += name[this.getRandomInt(0, name.length-1)] + ' ' + surname[this.getRandomInt(0, surname.length-1)] + ', ';
            }
        };
        return result;
    },

    descr: function(){
        var none = this.getRandomInt(0, 1);

        if(none == 1){
            var words = this.word();
            var value = this.getRandomInt(7, 15);
            var result = '';

            for(var i=0; i<value; i++ ){

                if( i == value-1){
                    result += words[this.getRandomInt(0, words.length-1)];
                }
                else{
                    result += words[this.getRandomInt(0, words.length-1)] + ' ';
                }
            };
            return result;
        }
        else return '';
    },

    getIendex: function(){
        return this.year() + this.month() + this.day();
    },

};