$(document).ready(function () {
    $(".survey_content").hide();
    $(".media_content").hide();

    $('.emojionearea-editor,.content_input').on("focus", function () {
        $(".data_segment").addClass("disabled");
    }).blur(function () {
        $(".data_segment").removeClass("disabled");
    });

    $('.ui.dropdown').dropdown();
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
    $(".content_input").emojioneArea({
        pickerPosition: "right",
        tonesStyle: "bullet",
    });
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
    var a = $(".ui.toggle.button");
    a.state({
        text: {
            inactive: '<i class="large icons"><i class="smile icon"></i><i class="inverted corner add icon"></i></i> Follow',
            active: '<i class="large icons"><i class="frown icon"></i><i class="inverted corner close icon"></i></i> Unfollow'
        }
    });
    $('.act_btn').popup({
        transition: 'vertical flip',
        delay: {
            show: 10,
            hide: 10
        },
        inline: true,
    });

    $("body").niceScroll({
        cursorcolor: "#ddd",
        cursorwidth: 5,
        cursorborderradius: 0,
        cursorborder: 0,
        scrollspeed: 50,
        autohidemode: true,
        zindex: 9999999,
        spacebarenabled: false
    });

    $('.action_buttons').on('click', '.act_btn', function () {
        $(this).addClass('blue').siblings().removeClass('blue').addClass('default');
    });
});

function getLocation() {
    if ("geolocation" in navigator) { //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function (position) {
            var geocoder = new google.maps.Geocoder(); // create a geocoder object
            var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // turn coordinates into an object
            geocoder.geocode({
                'latLng': location
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) { // if geocode success
                    var addLocation = results[0].formatted_address; // if address found, pass to processing function
                    //console.log(results)

                    $(".emojionearea-editor").append("@(" + addLocation + " " + ")");

                    $(".getplace").attr("data-tooltip", addLocation).attr("data-position", "top left");
                }
            });
        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }
};
$(".getplace").on("click", function () {
    //$(this).addClass("disabled");

    $('.share_btn').transition('pulse');
    $(".share_btn").removeClass("disabled");
    getLocation();
})

var a = $(".ui.follow.button");
a.state({
    text: {
        inactive: "Follow",
        active: "Following"
    }
});

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

$(".loadmore").on("click", function () {
    $(this).addClass("loading").delay(500).queue(function () {
        $(this).removeClass("loading").dequeue();
    });
});

$(".survey_btn").on("click", function () {
    $(".survey_content").show();
    $(this).addClass("disabled");
    $(".emojionearea-editor").attr("placeholder", "Ask a Quesiton?");
});
var counter = 1;

$(".add_option").click(function () {
    if (counter > 2) {
        alert("Only 2 textboxes allow");
        return false;
    } else if (counter == 2) {
        $(".add_option").addClass("disabled")
    }

    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<div class="ui fluid action input Textbox #' + counter + '">' +
        '<input type="text" placeholder="Option ' + (counter + 2) + '" name="textbox' + counter + '" id="textbox' + counter + '" value=""/><button class="ui teal icon button del_btn"><i class="minus icon"></i></button></div>');

    newTextBoxDiv.appendTo(".input_content");

    counter++;
    $(".del_btn").on("click", function () {
        if (counter == 1) {
            //alert("No more textbox to remove");

            return false;
        } else if (counter == 3) {
            $(".add_option").removeClass("disabled")
        }

        counter--;

        $("#TextBoxDiv" + counter).remove();
    });
});

$(".input_file").change(function () {
    if ($('.input_file').get(0).files.length === 0) {
        //console.log("No files selected.");
    } else {
        $(".media_content").show();
        //readURL(this);
    }
});

$(function () {
    // Multiple images preview in browser
    var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    $($.parseHTML('<img class="media_img">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('.input_file').on('change', function () {
        imagesPreview(this, '#upimg');
    });
});