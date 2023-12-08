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
    localStorage.setItem('name', artist);
  });

  function displayEvents(data) {
    const events = data._embedded.events;
    const eventsContainer = document.getElementById('eventsContainer');
  
    
    const limitedEvents = events.slice(0, 5);

    limitedEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.textContent = event.name;
        eventsContainer.appendChild(eventElement);
    });
}