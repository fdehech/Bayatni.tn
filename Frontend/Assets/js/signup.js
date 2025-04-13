const iframe = document.getElementById('myIframe');
iframe.onload = function () {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
};

function nextform(){
    iframe.setAttribute("src","form3.html");
}
