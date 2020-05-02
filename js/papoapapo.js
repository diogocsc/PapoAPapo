/*from https://stackoverflow.com/questions/32604812/create-mailto-from-form-with-custom-fields*/

function sendMail() {
    var name = $('#contact #name').val();
    var email = $('#contact #email').val();
    var message = $('#contact #address').val();
    window.location.href = 'mailto:papoapapo2020@gmail.com?subject=Nova Reserva - ' + name + ' (' + email + ')' + '&body=Morada:' + message;
};