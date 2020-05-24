window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Табы
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
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
            tabContent[b].classList.hide('hide');
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
    });

    // Timer

    //'2020-05-24'
    let deadline = new Date().toISOString(),
        days = +deadline.slice(8,10);
    deadline = deadline.slice(0, 10);
    deadline = deadline.replace(days, ++days);
    

    function getRemainingTime(endtime) {
        let total = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor(((total) / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / 1000 / 60 / 60));

        return {
            total,
            seconds,
            minutes,
            hours
        };
    }

    function setClock(id, endtime) {
        const timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timerInterval = setInterval(() => {
                updateClock();
            }, 1000);


        function updateClock() {
            let clockData = getRemainingTime(endtime);
            hours.textContent = convertTime(clockData.hours);
            minutes.textContent = convertTime(clockData.minutes);
            seconds.textContent = convertTime(clockData.seconds);

            if (clockData.total <= 0) {
                clearInterval(timerInterval);
            }
        }

        function convertTime(value) {
            value = value.toString();
            if (value.length === 1) {
                return '0' + value;
            }
            return value;
        }
    }

    setClock('timer', deadline);

    // Modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.popup-close'),
        tabsModalToggle = document.querySelectorAll('.description-btn');

    function toggleModal(flag) {
        if (flag) {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; 
        } else {
            overlay.style.display = 'none';
            this.classList.remove('more-splash');
            document.body.style.overflow = '';
        }
    }

    tabsModalToggle.forEach((el) => {
        el.addEventListener('click', function() {
            toggleModal.call(this, true);
        })
    });

    more.addEventListener('click', function () {
       toggleModal.call(this, true);
    });

    closeBtn.addEventListener('click', function () {
        toggleModal.call(this, false);
    })

});












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