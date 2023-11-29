function startAPI() {
    var queryURL = "https://api.spotify.com/v1/artists/{id}/realted-artists";
    var searchEl = document.getElementById('spotsearch')
    var userInput = document.getElementById('search1')
    var client_id = '3d8d15b8649240f095b004a16fd7af2c';
    var client_secret = 'dc988be7c9e542d0a6ac51c2a60adc92';

    fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"

    })
        .then(response => response.json()).then(data => {
            console.log(data.access_token);
            console.log(data);
            var token = data.access_token;
            getArtist(token)
        })

    function getArtist(token) {
        fetch("https://api.spotify.com/v1/search?q=" + "beyonce" + "&type=artist&limit=1", {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'GET'
        })
            .then(response => response.json()).then(data => {
                console.log(data);
                var oldArtist = data.artists.items[0].id;
                console.log(data.artists.items[0].id);
                getNewArtist(oldArtist);
            })

        function getNewArtist(oldArtist) {
            fetch("https://api.spotify.com/v1/artists/" + oldArtist + "/related-artists", {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            })
                .then(response => response.json()).then(data => {
                    console.log(data);
                    var newArtist = data.artists[Math.floor(Math.random() * data.artists.length)].id;
                    console.log(newArtist);
                    displayNew(newArtist);
                })

            function displayNew(newArtist) {
                fetch("https://api.spotify.com/v1/artists/" + newArtist, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    method: 'GET'
                })
                    .then(response => response.json()).then(data => {
                        console.log(data);
                        var playlistEl = data.external_urls;
                        console.log(playlistEl);

                        // if (playlistEl) {
                        //     var playlist = document.getElementById('playlist')
                        //     var newPlaylist = playlistEl + "?utm_source=oembed"
                        //     playlist.setAttribute('src', playlistEl)
                            
                        // }
                    })
            }


        }

    }
}

startAPI()