var a = location.href;
var filtr = a.substring(a.indexOf("?") + 1);

var regex = new RegExp(filtr, "i");

$.getJSON('data/person_data.json', function (data) {

    $.each(data, function (key, val) {
        if ((val.user_name.search(regex) != -1) || (val.company.search(regex) != -1)) {
            $(".profile_img img").attr("src", val.avatar);
            $(".profile_name").html(val.first_name + " " + val.last_name);
            $(".profile_info").html(val.job + ", " + val.company + " Company");

            //alert(val.user_name)
        }
    });

});

$.ajax({
    type: "GET",
    url: "data/person_data.json",

    beforeSend: function () {
        $(".loadeing").html("<img src='images/preloader_1.gif' />");
    },
    success: function (response) {

        var randomn = Math.floor((Math.random() * 100) + 1);
        for (var i = randomn; i < randomn + 5; i++) {

            $(".sug_users").append('<div class="item">\
                                     <div class="ui tiny image">\
                                         <img src="' + response[i].avatar + '">\
                                     </div>\
                                     <div class="content">\
                                         <a class="header" onclick="open_modal(\'' + response[i].user_name + '\',\'' + response[i].id + '\',\'' + response[i].avatar + '\')"> ' + response[i].first_name + " " + response[i].last_name + '</a>\
                                         <div class="meta">\
                                             <span>' + response[i].job + '</span>\
                                         </div>\
                                         <div class="description">\
                                             <p></p>\
                                         </div>\
                                         <div class="extra">\
                                                <button class="ui greenli inverted tiny button follow">Follow</button>\
                                         </div>\
                                     </div>\
                                 </div>')
        }
    },
    complete: function () {

        $(".loadeing").html('<img src="images/logo.png" class="ui mini image" />');
        $(".follow").on("click", function () {
            $(this).addClass("loading").delay(500).queue(function () {
                $(this).removeClass("loading").dequeue();
            });
        }).state({
            text: {
                inactive: "Follow",
                active: "Following"
            }
        });
    },
});