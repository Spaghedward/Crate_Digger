var userEmail = document.getElementById('#user-email');

document.getElementById('#email-btn').addEventListener('click' , function() {
    console.log(userEmail.value);
    alert("Welcome!");
    userEmail.reset();
});