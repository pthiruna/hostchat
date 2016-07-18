var oneUserName = "Swetha";
var twoUserName = "Prakash";
var oneGetMsgUrl = "http://prakash-pesu.rhcloud.com/userone";
var oneSendMsgUrl = "http://prakash-pesu.rhcloud.com/usertwo";
var twoGetMsgUrl = "http://prakash-pesu.rhcloud.com/usertwo";
var twoSendMsgUrl = "http://prakash-pesu.rhcloud.com/userone";
var baseUrl="https://chat-pthiruna.c9users.io/";


var oneSetA = [
    '                        <li class="left clearfix"><span class="chat-img pull-left">',
    '                            <img src="http://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" class="img-circle">',
    '                        </span>',
    '                            <div class="chat-body clearfix">',
    '                                <div class="header">',
    '                                    <strong class="primary-font">'
].join('');

var oneSetB = [
    '</strong> <small class="pull-right text-muted">',
    '                                        <span class="glyphicon glyphicon-time"></span>XXYYZZ</small>',
    '                                </div>',
    '                                <p>'

].join('');

var oneSetC = [
    '</p>',
    '                            </div>',
    '                        </li>'
].join('');


var twoSetA = [
    ' <li class="right clearfix"><span class="chat-img pull-right">',
    '                            <img src="http://placehold.it/50/FA6F57/fff&amp;text=ME" alt="User Avatar" class="img-circle">',
    '                        </span>',
    '                            <div class="chat-body clearfix">',
    '                                <div class="header">',
    '                                    <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>XXYYZZ</small>',
    '                                    <strong class="pull-right primary-font">'
].join('');

var twoSetB = [
    '</strong>',
    '                                </div>',
    '                                <p>'
].join('');

var twoSetC = [
    ' </p>',
    '                            </div>',
    '                        </li>'
].join('');

var badge = 0;
var favicon = new Favico({
    animation: 'popFade'
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function updateStatus() {
    var user = $('input[name="user"]:checked').val();
    var sender = "";
    if (user == "one") {
        sender = "two";
    }
    else {
        sender = "one";
    }
    var urlVal = baseUrl +"user"+user+"online"
     $.ajax({
        url: urlVal,
        success: function(result) {
            if(result=="offline"){
                $('#'+user).css("color", "red");
            }else {
                 $('#'+user).css("color", "green");
            }
            
        }
    });
    
    urlVal = baseUrl +"user"+sender+"online"
     $.ajax({
        url: urlVal,
        success: function(result) {
            if(result=="offline"){
                $('#'+sender).css("color", "red");
            }else {
                 $('#'+sender).css("color", "green");
            }
            
        }
    });
    
}
function getmessages() {
    var user = $('input[name="user"]:checked').val();
    var sender = "";
    if (user == "one") {
        sender = "two";
    }
    else {
        sender = "one";
    }
    var urlVal = window[user + "GetMsgUrl"];
    console.log("fetching message " + urlVal);
    $.ajax({
        url: urlVal,
        success: function(result) {
            console.log("Result " + result);
            if (result != "") {


                badge++;
                favicon.badge(badge);

                var user = $('input[name="user"]:checked').val();
                result = window[user + 'SetA'] + window[sender + 'UserName'] + window[user + 'SetB'] + result + window[user + 'SetC'];
                //
                result = result.replace("XXYYZZ", new Date().toLocaleTimeString());
                $(".chat").append(result);
                $(".panel-body").scrollTop($(".panel-body")[0].scrollHeight);
            }
        }
    });
}
$(document).ready(function() {

    if(getUrlVars()["me"]=="prakash")
    {
        $('input[name="user"][value="two"]').prop('checked', true);
    }

    $("body").mouseover(function() {
        favicon.reset();

    });

    $("#btn-input").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#btn-chat").click();
        }
    });

    $("#btn-chat").click(function() {
        var user = $('input[name="user"]:checked').val();
        var urlVal = window[user + "SendMsgUrl"];
        console.log("Sending message " + urlVal);

        var receiver = "";
        if (user == "one") {
            receiver = "two";
        }
        else {
            receiver = "one";
        }
        var message = $("#btn-input").val();
        var user = $('input[name="user"]:checked').val();
        var result = window[receiver + 'SetA'] + window[user + 'UserName'] + window[receiver + 'SetB'] + message + window[receiver + 'SetC'];
        result = result.replace("XXYYZZ", new Date().toLocaleTimeString());
        $(".chat").append(result);
        $(".panel-body").scrollTop($(".panel-body")[0].scrollHeight);
        $("#btn-input").val("");
        $.post(urlVal, {
                name: message,
                city: "Duckburg"
            },
            function(data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
            });
    });
    setInterval(getmessages, 2000);
    setInterval(updateStatus, 6000);

});
