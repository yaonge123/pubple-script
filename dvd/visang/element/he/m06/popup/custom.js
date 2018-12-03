$(document).ready(function(){


    $(".file > div").eq(0).show();

    $(".list1 li a").click(function(e){

        e.preventDefault();

        var unit = $(this).attr("href");
        var num = $(this).parent("li").index()+1;

        if(num==1 || num==10){

        $(".list1 li").removeClass("on");
        $(this).parent("li").addClass("on");
        $(".supply1").removeClass('on');

        $(".char").hide();
        $(".file,.q_wrap").show();
        $(".fix").hide();
        $(".file").mCustomScrollbar("stop");
        $("#mCSB_1_container, #mCSB_1_scrollbar_vertical, #mCSB_1_dragger_vertical").stop().css("top","0");
        $("."+unit+".fix").show();

        }
        else{}
    });

    $("a.hwp,a.st_book,a.ppt_1,a.pdf").hover(function(){

        var href=$(this).attr("href");

        if(href=='#'){
            $(this).find("p").show();
        }

    },function(){

        var href=$(this).attr("href");

        if(href=='#'){
            $(this).find("p").hide();
        }

    });


    var num = $(this).index();
    var unit_on = $(".list1 li.on").index();
    var href=$(this).find("a").attr("href");

    /*단원마무리 <추후 제공>말풍선*/
    $(".quick_menu li").hover(function(){

        href=$(this).find("a").attr("href");
        unit_on = $(".list1 li.on").index();
        num = $(this).index();

        if(unit_on == 9){

            if(1<= num <4){ $(this).find("p").show();}
        }
        if(href=='#'){
            $(this).find("p").show();
        }

    },function(){

        num = $(this).index();
        unit_on = $(".list1 li.on").index();
        href=$(this).find("a").attr("href");

        if(unit_on == 9){

            if(1<= num <4){ $(this).find("p").hide();}

        }
        if(href=='#'){
            $(this).find("p").hide();
        }

    });




     $(".file").mCustomScrollbar({

        axis:"y",
        theme:"minimal-dark"

    });


    $(".char > div").mCustomScrollbar({

        axis:"y",
        theme:"minimal-dark"

    });

    $(".supply1").click(function(){

        var supply = $(".supply1").hasClass("on");
        $(".list1 li").removeClass("on");

        $(".supply1").addClass("on");

        $(".file,.q_wrap").hide();
        $(".char").show();

    });



})
