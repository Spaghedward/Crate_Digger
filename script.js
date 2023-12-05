var searchEl = document.getElementById('spot-search');
var table = document.getElementById('table1');

// This function is a post fetch to get an access token using our client id and secret.
// The token value is stored as 'token' and used as the argument for the next function.

function startAPI() {
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

    // This function uses the user input to fetch all the data about the searched artist.
    // Then the unique artist ID is taken from the data and used as an argument in the next function.
    function getArtist(token) {
        var userInput = document.getElementById('search1').value;
        fetch("https://api.spotify.com/v1/search?q=" + userInput + "&type=artist&limit=1", {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            method: 'GET'
        })
            .then(response => response.json()).then(data => {
                console.log(data);
                var oldArtist = data.artists.items[0].id;
                console.log(data.artists.items[0].name)
                console.log(oldArtist);
                getNewArtist(oldArtist);
                console.log(userInput.value)
            })

        // This function uses the artist id to fetch a random related artist from spotify API.
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

            // This function fetches the info for the related artist and saves the artist name in local storage.
            // Buttons are then created and appended to a list for each new artist discovered.
            function displayNew(newArtist) {
                fetch("https://api.spotify.com/v1/artists/" + newArtist, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    method: 'GET'
                })
                    .then(response => response.json()).then(data => {
                        console.log(data);
                        console.log(data.name);
                        var saved = [
                            {
                                id: data.id,
                                name: data.name,
                                url: data.external_urls.spotify
                            }
                        ]
                        var existingSaved = JSON.parse(localStorage.getItem('saved')) ?? [];
                        var newSaved = existingSaved.concat(saved)
                        localStorage.setItem('saved', JSON.stringify(newSaved));

                        for (var i = 0; i < newSaved.length; i++) {
                            var li = document.createElement('li');
                            var newButton = document.createElement("a");
                            newButton.setAttribute('class', 'btn');
                            newButton.setAttribute('href', newSaved[i].url)
                            newButton.innerHTML = newSaved[i].name;
                            li.appendChild(newButton);
                            table.appendChild(li);
                            embedArtist(newArtist)
                        }
                    })



            }

        }
    }
}
// This function imbeds a spotify player into the page with the top tracks of the related artist.
function embedArtist(artist) {
    if (artist) {
        var playlist = document.getElementById('playlist');
        var newPlayList = 'https://open.spotify.com/embed/artist/' + artist
        playlist.setAttribute('src', newPlayList);


    }
}


document.getElementById("spot-search").addEventListener("click", startAPI)
// startAPI()