let inputRub = document.querySelector('#rub'),
    inputUsd =  document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', './JSON/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    
    //status -  Просто код ответа
    //statusText - OK, not found
    //responseText - Текст ответы сервера, что backend разработчки присылает. Товары интернет магазина
    //response - Тоже самое
    //readeState - Текущее состояние запроса
    request.addEventListener('readystatechange', function(){
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.response);
            inputUsd.value = (inputRub.value / data.usd).toFixed(2);
        } else{
            inputUsd.value = "Что-то пошло не так!";
        }
    });

});
