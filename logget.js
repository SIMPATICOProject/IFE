var ip = "http://213.98.52.219:4570/simpatico/api/logs/insert";
//duration time store function

$(document).ready(function(){
////make serial to distinguish each user
    if (typeof $.cookie("serial")== "undefined"){
        var l = 8;
        var c = "abcdefghijklmnopqrstuvwxyz0123456789";
        var cl = c.length;
        var serial = "";
        for(var i=0; i<l; i++){
            serial += c[Math.floor(Math.random()*cl)];
        }
        $.cookie("KEY", serial);
    } else {
        var serial = $.cookie("serial");
    }

////document click
    for (var i=0; i<5; i++){
        $.cookie("simplify_sp"+i, false);
        $.cookie("annotate_sp"+i, false);
        $.cookie("citizenPed_sp"+i, false);
    }
    $(window).on('beforeunload', function(e) {
        postData =  {
            "simplify_sp0":$.cookie("simplify_sp0"),
            "simplify_sp1":$.cookie("simplify_sp1"),
            "simplify_sp2":$.cookie("simplify_sp2"),
            "simplify_sp3":$.cookie("simplify_sp3"),
            "simplify_sp4":$.cookie("simplify_sp4"),
            "annotate_sp0":$.cookie("annotate_sp0"),
            "annotate_sp1":$.cookie("annotate_sp1"),
            "annotate_sp2":$.cookie("annotate_sp2"),
            "annotate_sp3":$.cookie("annotate_sp3"),
            "annotate_sp4":$.cookie("annotate_sp4"),
            "citizenPed_sp0":$.cookie("citizenPed_sp0"),
            "citizenPed_sp1":$.cookie("citizenPed_sp1"),
            "citizenPed_sp2":$.cookie("citizenPed_sp2"),
            "citizenPed_sp3":$.cookie("citizenPed_sp3"),
            "citizenPed_sp4":$.cookie("citizenPed_sp4"),
            "serial":serial,
            "datatype":"doc_click"
        };
        //console.log(postData);
        $.post(ip ,JSON.stringify(postData));
    });


////duration time of each tab stay
    var num_now = 0;
    var ts1 = (new Date()).getTime();
    $('a').on('click',function(){
        var tablist=$("ul.ui-tabs li a");
        var num_next = $.inArray(this,tablist);
        //if user click different tab
        if (0 <= num_next && num_now != num_next){
            ts2 = (new Date()).getTime();
            duration = ((ts2-ts1)/ 1000);
            if (duration > 3600){   //limit
                duration = 3600;
            }
            postData =  {
                "duration":duration,
                "type":num_now,
                "datatype":"duration",
                "serial":serial
                //  "timestamp":ts2
            };
            //console.log(postData);
            $.post(ip ,JSON.stringify(postData));
            num_now = num_next;
            ts1 = (new Date()).getTime();
        }
    });
});


////document clisk log
function checkButtons(name){
    var simplifyValue = $('#simplifySwitch')[0].value;
    var annotateValue = $('#annotateSwitch')[0].value;
    var citizenPediaValue = $('#citizenPediaSwitch')[0].value;
    var checklist=[(simplifyValue == "simplifyOn"),(annotateValue == "annotateOn"),(citizenPediaValue == 'citizenPediaOn')];
    if ($.inArray(true,checklist) >= 0){
        if (checklist[0]) {
            simplify(name);
            $.cookie("simplify_"+name,true);
        } else if (checklist[1]){
            annotate(name);
            $.cookie("annotate_"+name,true);
        } else if (checklist[2]){
            citizenpedia(name);
            $.cookie("citizenPed_"+name,true);
        }
    }
}

