window.addEventListener('DOMContentLoaded', function() {

    const deadline = '2020-06-24';

    function getRemainingTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((total/1000) % 60),
            minites = Math.floor(total/(1000*60) % 60),
            hours = Math.floor(total/(1000*60*60) % 24),
            days = Math.floor(total/(1000*60*60*24) % 30);

        return {total, seconds, minites, hours, days};
    }

    startTimer('timer', deadline);
    
    function startTimer(id, endtime) {
        const timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            interval = setInterval(() => {
                handleTimerTick();
            }, 1000);

        if (Date.parse(endtime) - Date.parse(new Date()) <= 0) {
            timer.textContent ="Ошибка";
        }
        function handleTimerTick(){
            let timerData = getRemainingTime(endtime);
            days.textContent = convertTime(timerData.days);
            hours.textContent = convertTime(timerData.hours);
            minutes.textContent = convertTime(timerData.minites);
            seconds.textContent = convertTime(timerData.seconds);

            if (timerData.total <= 0) {
                clearInterval(interval);
            }
        }

        function convertTime(value) {
            value = value.toString();
            if (value.length === 1) {
                return '0'+value;
            }
            return value;
        }
    }
});