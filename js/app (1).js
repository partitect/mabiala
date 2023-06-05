var count = 20;

$(document).ready(function () {
    getdata(0, count);
    rollBg();
});

var content = [{
    title: 'Katherine Wallace',
    url: 'profile.html?kathh'
}, {
    title: 'Julie Hart',
    url: 'profile.html?jhart0'
}, {
    title: 'Willie Patterson',
    url: 'profile.html?wpatterson1'
}, {
    title: 'Sharon Mccoy',
    url: 'profile.html?smccoy3'
}, {
    title: 'Bobby Collins',
    url: 'profile.html?bcollins4'
}, {
    title: 'Ruby Hanson',
    url: 'profile.html?rhanson5'
}, {
    title: 'Aaron Morrison',
    url: 'profile.html?amorrisona'
}, {
    title: 'Netherlands Antilles',
    url: 'profile.html?kathh'
}, {
    title: 'Virginia Hamilton',
    url: 'profile.html?vhamiltong'
}, {
    title: 'Marie Gray',
    url: 'profile.html?mgrayi'
}, {
    title: 'Dennis Henry',
    url: 'profile.html?dhenrys'
}, {
    title: 'Lois Frazier',
    url: 'profile.html?lfrazierv'
}, {
    title: 'Gerald Gray',
    url: 'profile.html?ggray12'
}, {
    title: 'Amanda Johnson',
    url: 'profile.html?ajohnson1a'
}, {
    title: 'Harold Williams',
    url: 'profile.html?hwilliams1b'
}, {
    title: 'Ernest Myers',
    url: 'profile.html?emyers1h'
}, {
    title: 'Lillian Hicks',
    url: 'profile.html?lhicks1j'
}, {
    title: 'Pamela Foster',
    url: 'profile.html?pfoster1o'
}, {
    title: 'Mildred Wells',
    url: 'profile.html?mwells1s'
}, {
    title: 'Judith Harper',
    url: 'profile.html?jharper1v'
}, {
    title: 'Samuel Williamson',
    url: 'profile.html?swilliamson1x'
}, {
    title: 'Diane Wheeler',
    url: 'profile.html?dwheeler20'
}, {
    title: 'Tammy Mcdonald',
    url: 'profile.html?tmcdonald24'
}, {
    title: 'Matthew Robertson',
    url: 'profile.html?mrobertson2a'
}
    // etc
];
$('.ui.search').search({
    source: content
});

var map_adres;

$(".loadmore").on("click", function () {
    var newcount1 = count + 1;
    getdata(newcount1, newcount1 + 19);
    count = newcount1 + 18;
});

function getdata(count, newcount) {

    $.ajax({
        type: "GET",
        url: "data/person_data.json",
        beforeSend: function () {
            $(".loadeing").html("<img src='images/preloader_1.gif'/>");
            EmbedJS.destroyEmbedJS();
        },

        cache: false,
        success: function (response) {
            //console.log(response);

            for (var i = count; i < newcount; i++) {
                if (response[i].adress !== null) {
                    map_adres = "@(" + response[i].adress + ")";
                } else {
                    map_adres = "";
                }
                $(".personal_data").append('<div class="item">\
                                    <div class="ui tiny rounded image">\
                                        <img src="' + response[i].avatar + '">\
                                    </div>\
                                    <div class="content">\
                                        <a class="header">\
                                            <a class="user" onclick="open_modal(\'' + response[i].user_name + '\',\'' + response[i].id + '\',\'' + response[i].avatar + '\')" title="' + response[i].first_name + " " + response[i].last_name + '" data-position="top left" data-title="' + response[i].job + '" data-content="' + response[i].company + '" data-variation="inverted redli">\
                                                ' + response[i].first_name + " " + response[i].last_name + '\
                                            </a> @' + response[i].user_name + ' - <time data-momentjs style="text-transform:capitalize">' + response[i].date + '</time>\
                                        </a>\
                                        <div class="meta">\
                                            <span></span>\
                                        </div>\
                                        <div class="description">\
                                            <div class="rawText">\
                                                <p>\
                                                   ' + response[i].paragraph + '\
                                                </p>\
                                            </div>\
                                        </div>\
                                        <div class="extra rawText">\
                                    ' + map_adres + '\
                                        </div>\
                                    </div>\
                                </div>');
            }
        },
        complete: function () {
            $(".personal_data").FancyIndex();
            EmbedJS.setOptions({
                googleAuthKey: 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts',
                inlineEmbed: 'all',
                tweetsEmbed: true,
                highlightCode: true,
                videoDetails: false,
                tweetOptions: {
                    maxWidth: 600,
                    hideMedia: false,
                    hideThread: false,
                    align: 'none',
                    lang: 'tr',
                },

                vineOptions: {
                    maxWidth: null,
                    type: 'simple', //'postcard' or 'simple' embedding
                    responsive: true,
                    width: 600,
                    height: 460
                },
            });
            EmbedJS.applyEmbedJS('.rawText');

            $(".loadeing").html('<img src="images/logo.png" class="ui mini image" />');
            $("time[data-momentjs]").each(function (idx, item) {
                var $item = $(item),
                    mdate = moment($item.text(), "DD.MM.YYYY, h:mm:ss");
                $item.attr("title", mdate.format("d MMMM YYYY, dddd - H:mm")).text(mdate.fromNow());
            });
            $('.user').popup({
                transition: 'vertical flip',
                delay: {
                    show: 10,
                    hide: 10
                },
                inline: true,
            });

        },
    });
}

$.ajax({
    type: "GET",
    url: "data/person_data.json",

    success: function (response) {
        var randomn = Math.floor((Math.random() * 100) + 1);
        for (var i = randomn; i < randomn + 5; i++) {

            $(".sug_user").append('<div class="item">\
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
    }
});

function open_modal(whois, username, avatar) {

    $("#modal_content").html('<div class="ui standard small modal" id="profilModal' + username + '">\
        <div class="header kapak_img" style="height:150px;width:100%;">\
        </div>\
        <div class="image content profil_img">\
            <div class="ui small image rounded pp">\
                <img src="' + avatar + '">\
            </div>\
            <div class="description p_info">\
                <div class="ui header"></div>\
                <p>Weve found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your e-mail address.</p>\
                <p>Is it okay to use this photo?</p>\
            </div>\
        </div>\
        <div class="actions">\
            <div class="ui black deny button">\
                Close\
            </div>\
            <a class="ui positive right labeled icon button" href="profile.html?' + whois + '">\
               Profile\
                <i class="eye icon"></i>\
            </a>\
        </div>\
    </div>')
    $("#profilModal" + username).modal('setting', 'transition', 'vertical flip').modal({
        blurring: true
    }).modal('show');
    rollBg();
}

function newGradient() {
    var c1 = {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
    };
    var c2 = {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255)
    };
    c1.rgb = 'rgb(' + c1.r + ',' + c1.g + ',' + c1.b + ')';
    c2.rgb = 'rgb(' + c2.r + ',' + c2.g + ',' + c2.b + ')';
    return 'radial-gradient(at top left, ' + c1.rgb + ', ' + c2.rgb + ')';
}

function rollBg() {
    $('.kapak_img,.profileheader').css('background', newGradient());

}