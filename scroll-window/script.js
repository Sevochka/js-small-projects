let box = document.querySelector('.box'),
    btnToogle = document.querySelector('.btn-open-close'),
    btnGoTop = document.querySelector('.btn-scroll');

let width = box.scrollWidth,
    height = box.scrollHeight,
    nativeHeight = box.offsetHeight;

btnToogle.addEventListener('click', function(){
    if (box.offsetHeight === box.scrollHeight ) {
        btnToogle.textContent = "Open full";
        box.style.height = nativeHeight + 'px';
    } else {
        btnToogle.textContent = "Close full";
        box.style.height = height + 'px';
    }
})

btnGoTop.onclick = () => {
    box.scrollTop = 0;
}

// Получить метрику элемента на странице топ боттом лефт райт и др
console.log(box.getBoundingClientRect());
// Размеры САМОГО ДОКУМЕНТА
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight);