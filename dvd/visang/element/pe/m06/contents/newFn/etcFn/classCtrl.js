//클레스 리셋 기능

function _checkAnswer(data){

    for(var index = 0; data.length > index; index++){
        $(data[index].boxDomId).find('input').prop('checked' , false);
    }

    for(var index = 0; data.length > index; index++){
        $(data[index].answerDomId).prop('checked' , true);
    }
}

//클레스 리셋
function _resetAnswer(data){
    for(var index = 0; data.length > index; index++){
        $(data[index].boxDomId).find('input').prop('checked' , false);
    }
}