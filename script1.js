function getEvents() {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Y6RBgjf9ViUPcIwo7rb9rmCvwZjGEbLg', {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
  
      .then(function (response) {
        return response.json();
      })
  
      .then(function (data) {
        console.log(data);
        
      });
  }

  function displayEvents(data) {
    const events = data._embedded.events;
    const eventsContainer = document.getElementById('eventsContainer');
  
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.textContent = event.name;
      eventsContainer.appendChild(eventElement);
    });
  }

  function searchEvents(artist) {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=${artist}&apikey=Y6RBgjf9ViUPcIwo7rb9rmCvwZjGEbLg`, {
      method: 'GET',
      credentials: 'same-origin',
      redirect: 'follow',
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayEvents(data);
    });
  }

  document.getElementById('TmSearchBtn').addEventListener('click', function() {
    const artist = document.getElementById('TmSearchInput').value;
    searchEvents(artist);
  });

  function displayEvents(data) {
    const events = data._embedded.events;
    const eventsContainer = document.getElementById('eventsContainer');
  
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.textContent = event.name;
      eventsContainer.appendChild(eventElement);
    });
  }

  document.getElementById('TmSearchBtn').addEventListener('click', function() {
    const artist = document.getElementById('TmSearchInput').value;
    localStorage.setItem('name', artist)
    const widget = document.querySelector('div[w-type="event-discovery"]');
    widget.setAttribute('w-keyword', artist);
    
  });

  document.getElementById('TmSearchBtn').addEventListener('click', function() {
    const artist = document.getElementById('TmSearchInput').value;
    const widget = document.querySelector('div[w-type="event-discovery"]');
    widget.setAttribute('w-keyword', artist);
  });

  document.getElementById('TmSearchBtn').addEventListener('click', function() {
    const artist = document.getElementById('TmSearchInput').value;
    const widget = document.querySelector('div[w-type="event-discovery"]');

    // Get the old artist from local storage
    const oldArtist = localStorage.getItem('artist');

    // If there's an old artist, display its events
    if (oldArtist) {
      widget.setAttribute('w-keyword', oldArtist);
      searchEvents(oldArtist);
    }

    // Save the new artist in local storage
    localStorage.setItem('artist', artist);
  });