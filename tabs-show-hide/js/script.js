window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++) {
            const element = tabContent[i];
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.add('show');
            tabContent[b].classList.hide('hide') ;
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                const element = tab[i];
                if (target == element) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })
})












// window.addEventListener('DOMContentLoaded', () => {
//     'use strict';
//     let tabs = document.querySelectorAll('.info-tabcontent');
//     let btns = document.querySelectorAll('.info-header-tab');

//     btns.forEach((el, i) => {
//         el.onclick = () => {
//             tabs[i].classList.remove('hide');
//             closeOtherTabsExcept(i);
//         }
//     })

//     function closeOtherTabsExcept(tabId){
//         tabs.forEach((el, i) => {
//             if (i !== tabId) {
//                 el.classList.add('hide');
//             }
//         })
//     }
// })