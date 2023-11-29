function startAPI() {
    var queryURL = "https://api.spotify.com/v1/artists/{id}/realted-artists";
    var button = document.getElementById('button')
    var userInput = document.getElementById('')
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
        fetch("https://api.spotify.com/v1/search?q=" + "beyonce" + "&type=artist", {
            headers: {
                'Authorization': 'Bearer' + token
            },
            method: 'GET'
        })
            .then(response => response.json()).then(data => {
                console.log(data);
            })
        
    }

}


startAPI()