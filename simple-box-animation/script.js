let btn = document.querySelector('.btn'),
    elem = document.querySelector('.box');

function animate(){
    let pos = 0;

    let timer = setInterval(frame, 10);
    function frame() {
        if (pos === 300) {
            clearInterval(timer);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.onclick = () => {
    animate();
}

let btnBlock = document.querySelector('.btn-block'),
    btns = btn.childNodes;

btnBlock.addEventListener('click', (event) => {
    if (event.target && event.target.tagName == "BUTTON") {
        console.log('hello');
    }
})