var dragAndDrop_merge = function( dragObj , dropZone , replace){

    this.dragObj = dragObj;
    this.dropZone = dropZone;
    this.replace = replace;

    var self = this;

    $.fn._dropAnswerCheck = function() {
        self.answerCheck(this);
        return this;
    };

    $.fn._dropResetCheck = function() {
        self.reset(this);
        return this;
    };


    $.fn._dropReset = function() {
        self.dropReset(this);
        return this;
    };

    try {
        this.init();
    } catch(e) {
        console.error(e);
    }
};

dragAndDrop_merge.prototype.removeData = function(flagStr){

    for(var i = 0; this.dropZone.length > i; i++){
        var test = this.dropZone[i].getAttribute('data-dropData');


        if(test){
            var tempArray = test.split(',');
            var tempAddArray = [];
            for(var index = 0; tempArray.length > index; index++) {
                if(tempArray[index] != flagStr) {
                    tempAddArray.push(tempArray[index]);
                }
            }

            var tempAddStr = '';
            for(var j = 0; tempAddArray.length > j; j++) {
                if(tempArray.length - 1 == j) {
                    tempAddStr += tempAddArray[j]
                } else {
                    tempAddStr += tempAddArray[j] + ',';
                }
            }
            this.dropZone[i].setAttribute('data-dropData' , tempAddStr);
        }
    }

};

dragAndDrop_merge.prototype.answerPositionMove = function(dom){

    for(var i = 0; dom.length > i; i++){
        if(dom[i].getAttribute('data-dropdata')){
            var _test = dom[i].getAttribute('data-dropdata').split(',');
            for( var _j = 0; _test.length > _j; _j++ ){
                var _obj = $('[data-drag='+_test[_j]+']');
                _obj.css({
                    'top' : _obj.attr('data-o_top'),
                    'left' : _obj.attr('data-o_left')
                });
            }
        }

        var test = dom[i].getAttribute('data-drop').split(',');
        var p = dom[i].getAttribute('data-a_position').split(',');



        for( var _i = 0; test.length > _i; _i++ ){
            var _obj = $('[data-drag='+test[_i]+']');
            var compareVal = _obj[0].offsetHeight * _i;
            _obj.animate({
                'top' : Number(p[0]) + compareVal,
                'left' : p[1]
            });


            this.dropZone.each(function(i,o){
                var dd = o.getAttribute('data-dropdata').match(test[_i]);

                if(dd){
                    var _dd = o.getAttribute('data-dropdata').split(',');
                    var _tt = [];

                    for(var __q = 0; _dd.length > __q; __q++){
                        if(_dd[__q] != test[_i]){
                            _tt.push(_dd[__q]);
                        }
                    }

                    var _addStr = '';
                    for(var _h = 0; _tt.length > _h; _h++){
                        _addStr += _tt[_h];

                        if(_tt.length - 1 != _h){
                            _addStr += ',';
                        }
                        o.setAttribute('data-dropdata' , _addStr);
                    }
                }

            });
        }




        dom[i].setAttribute('data-dropdata' , dom[i].getAttribute('data-drop'));
    }
};

dragAndDrop_merge.prototype.init = function(){
    var self = this;
    this.dragObj.draggable({
        revert: 'invalid'
    });
    //드랍 존
    this.dropZone.droppable({
        drop : function(e , ui){

            var dropData = ui.draggable.attr('data-drag');
            var getDropData = this.getAttribute('data-dropData');

            self.removeData(dropData);

            if(getDropData){
                var tempArray = getDropData.split(',');
                tempArray.push(dropData);

                var mergeString = '';

                for (var index = 0; tempArray.length > index; index++){
                    if(tempArray.length - 1 == index){
                        mergeString += tempArray[index]
                    }else{
                        mergeString += tempArray[index] + ',';
                    }
                }
                this.setAttribute('data-dropData' , mergeString);
            } else {
                this.setAttribute('data-dropData' , dropData);
            }

            var dataLen =  this.getAttribute('data-dropData').split(',').length;
            var compareVal = ui.draggable[0].offsetHeight * (dataLen - 1);
            var p = this.getAttribute('data-a_position').split(',');

            $(ui.draggable[0]).animate({
                'top' : Number(p[0]) + compareVal,
                'left' : p[1]
            });
        }
    });
    this.dragObj.parent().droppable({
        drop : function(e , ui){

            self.removeData(ui.draggable.attr('data-drag'));

            $(ui.draggable[0]).animate({
                'top' : $(ui.draggable[0]).attr('data-o_top'),
                'left' : $(ui.draggable[0]).attr('data-o_left')
            });
        }
    });
    this.dragObj.each(function( i, o ){
        o.setAttribute('data-o_top' , o.style.top);
        o.setAttribute('data-o_left' , o.style.left);
    });
};

dragAndDrop_merge.prototype.answerCheck = function(dom){


    var check = true;
    var _check = false;

    for(var i = 0; dom.length > i; i++){

        if(dom[i].getAttribute('data-dropdata')){

            var temp_1 = dom[i].getAttribute('data-drop').split(',');
            var temp_2 = dom[i].getAttribute('data-dropdata').split(',');

            if(temp_1.length != temp_2.length){
                check = false;
            } else {
                var _array = [];
                var test;
                for(var index = 0; temp_1.length > index; index++){
                    test = false;
                    for(var j = 0; temp_2.length > j; j++){
                        if(temp_1[index] == temp_2[j]){
                            test = true;
                        }else{
                            if(!test) test = false;
                        }
                    }
                    _array.push(test);
                }
                for(var _i = 0; _array.length > _i; _i++){
                    if(!_array[_i]){
                        check = false;
                    }
                }
            }
        } else {
            _check = true;
            check = false;
        }
    }


    if(_check) {
        Q_base.audio_check_true.play();
        this.answerPositionMove(dom);
        return true;
    } else {
        if(check) {
            Q_base.audio_check_true.play();
        } else {
            Q_base.audio_check_false.play();
            this.answerPositionMove(dom);
        }
        return check;
    }
};

dragAndDrop_merge.prototype.reset = function(dom){

    dom.each(function(i,o){
        $(o).animate({
            top : $(o).attr('data-o_top'),
            left : $(o).attr('data-o_left')
        });
    });

    this.dropZone.each(function(i,o){
        $(o).attr('data-dropData' , '');
    });

};


dragAndDrop_merge.prototype.dropReset = function(dom){
    if(dom[0].getAttribute('data-drop')){
        var _test = dom[0].getAttribute('data-drop').split(',');
        for( var _j = 0; _test.length > _j; _j++ ){
            var _obj = $('[data-drag='+_test[_j]+']');
            _obj.css({
                'top' : _obj.attr('data-o_top'),
                'left' : _obj.attr('data-o_left')
            });
        }
    }

    $(dom).attr('data-dropData' , '');
};