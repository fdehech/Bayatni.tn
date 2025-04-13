const iframe = document.getElementById('myIframe');
iframe.onload = function () {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
};

function nextform(){
    iframe.setAttribute("src","form2.html");
}



document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirm = document.querySelector('input[name="confirm_password"]').value;
    const cardCvc = document.querySelector('input[name="card_cvc"]').value;

    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }
    if (password !== confirm) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }
    
    if (!/^\d{4}$/.test(cardCvc)) {
        alert("Le code card doit être composé de 4 chiffres.");
        return;
    }
    localStorage.setItem('bayatni_user', JSON.stringify({
        name: fullname,
        email: email,
        loggedIn: true
    }));
    document.getElementById("confirmationMessage").textContent = "✅ Inscription réussie !";
    
    setTimeout(function() {
        window.location.href = "index.html";
    }, 1000);
});
document.querySelector('input[name="card_number"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
});

document.querySelector('input[name="card_cvc"]').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
});