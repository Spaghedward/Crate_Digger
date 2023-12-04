var searchEl = document.getElementById('spot-search');
var userInput = document.getElementById('search1');

function startAPI() {
    var table = document.getElementById('table1');
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
        fetch("https://api.spotify.com/v1/search?q=" + userInput.value + "&type=artist&limit=1", {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'GET'
        })
            .then(response => response.json()).then(data => {
                console.log(data);
                var oldArtist = data.artists.items[0].id;
                console.log(oldArtist);
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
                        console.log(data.name)
                        var artistName = data.name;
                        var existingSaved = JSON.parse(localStorage.getItem('saved')) ?? [];
                        var newSaved = existingSaved.concat(artistName)
                        localStorage.setItem('saved', JSON.stringify(newSaved));
                        for (var i = 0; i < newSaved.length; i++) {
                            var li = document.createElement('li');
                            var newButton = document.createElement("button");
                            newButton.setAttribute('class', 'btn')
                            newButton.setAttribute('type', 'search')
                            newButton.innerHTML = newSaved[i];
                            li.appendChild(newButton);
                            table.appendChild(li);
                            // var artistImage = data.images[2].url;
                            // var artistImageEl = document.getElementById('artist-pic');
                            // var artistNameEl = document.getElementById('artist-name');
                            // var img = document.createElement('img');
                            // img.src = artistImage;
                            // artistImageEl.appendChild(img);
                            // artistNameEl.innerHTML = artistName;

                            // for (let i = 0; i < data.genres.length; i++) {
                            //     var artistGenreEl = document.getElementById('artist-genre');
                            //     var newGenre = document.createElement('li');
                            //     newGenre.innerHTML = data.genres[i];
                            //     artistGenreEl.appendChild(newGenre);


                            // }

                            embedArtist(newArtist)
                        }
                    })

                function embedArtist(newArtist) {
                    if (newArtist) {
                        var playlist = document.getElementById('playlist');
                        var newPlayList = 'https://open.spotify.com/embed/artist/' + newArtist
                        playlist.setAttribute('src', newPlayList);


                    }
                }

            }

        }
    }
}

searchEl.addEventListener('click', startAPI())