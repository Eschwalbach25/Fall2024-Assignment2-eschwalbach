var images = [
    'https://images.unsplash.com/photo-1603808523691-a2f471d415f0?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706306688441-31130c00a6fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];
var currentImageIndex = 0;
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '9c67783122264da6bdd29b0ec0d794fa'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'visible').dialog({
                width: $(window).width(),
                height: $(window).height(),
                close: function () {
                    $(this).css('visibility', 'hidden');
                }
            });
        })
        .fail(function () {
            alert('error');
        });
}

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}


function showCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var currentTime = hours + ':' + minutes + ' ' + ampm;
    $('#time').text(currentTime);
    $('#time').css('visibility', 'visible').dialog({
        close: function () {
            $(this).css('visibility', 'hidden');
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // Set the initial background image
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;

    // Add event listeners
    document.getElementById('searchButton').addEventListener('click', apiSearch);
    document.getElementById('timeButton').addEventListener('click', showCurrentTime);
    document.getElementById('searchEngineName').addEventListener('click', changeBackgroundImage);
});
