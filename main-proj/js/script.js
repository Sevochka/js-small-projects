window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Табы
  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      const element = tabContent[i];
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.add("show");
      tabContent[b].classList.remove("hide");
    }
  }

  info.addEventListener("click", (event) => {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
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
    days = +deadline.slice(8, 10);
  deadline = deadline.slice(0, 10);
  deadline = deadline.replace(days, ++days);

  function getRemainingTime(endtime) {
    let total = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor(total / 1000 / 60 / 60);

    return {
      total,
      seconds,
      minutes,
      hours,
    };
  }

  function setClock(id, endtime) {
    const timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
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
        return "0" + value;
      }
      return value;
    }
  }

  setClock("timer", deadline);

  // Modal window

  let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    closeBtn = document.querySelector(".popup-close"),
    tabsModalToggle = document.querySelectorAll(".description-btn");

  function toggleModal(flag) {
    if (flag) {
      overlay.style.display = "block";
      this.classList.add("more-splash");
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.display = "none";
      this.classList.remove("more-splash");
      document.body.style.overflow = "";
    }
  }

  tabsModalToggle.forEach((el) => {
    el.addEventListener("click", function () {
      toggleModal.call(this, true);
    });
  });

  more.addEventListener("click", function () {
    toggleModal.call(this, true);
  });

  closeBtn.addEventListener("click", function () {
    toggleModal.call(this, false);
  });

  // Forms

  let message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let formData = new FormData(form);

    let obj = {};
    formData.forEach((el, key) => {
      obj[key] = el;
    });

    let json = JSON.stringify(obj);

    new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("POST", "../server.php");
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );

      request.send(json);

      request.addEventListener("readystatechange", function () {
        if (request.readyState < 4) {
          statusMessage.textContent = message.loading;
        } else if (request.readyState === 4 && request.status === 200) {
          resolve();
        } else {
          reject();
        }
      });
    })
      .then(() => {
        statusMessage.textContent = message.success;
      })
      .catch(() => (statusMessage.textContent = message.failure))
      .then(() => {
        for (let i = 0; i < input.length; i++) {
          const element = input[i];
          element.value = "";
        }
      });
  });

  // Контактная форма
  let contactForm = document.getElementById("form"),
    inputs = contactForm.querySelectorAll("input"),
    contactStatus = document.createElement("div");

  contactStatus.classList.add("status");
  contactStatus.style.color = "white";
  contactForm.appendChild(contactStatus);

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(contactForm);

    let obj = {};
    formData.forEach((el, key) => {
      obj[key] = el;
    });

    let json = JSON.stringify(obj);

    const promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("POST", "../server.php");
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );

      request.send(json);

      request.addEventListener("readystatechange", () => {
        if (request.readyState < 4) {
          contactStatus.textContent = message.loading;
        } else if (request.readyState === 4 && request.status === 200) {
          resolve();
        } else {
          reject();
        }
      });
    });

    promise
      .then(() => {
        contactStatus.textContent = message.success;
      })
      .catch(() => (contactStatus.textContent = message.failure))
      .then(() => {
        inputs.forEach((el) => {
          el.value = "";
        });
      });
  });

  //Slider

  let slideIndex = 0,
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = dotsWrap.querySelectorAll(".dot");

  const refreshSlider = (indexToShow) => {
    slides.forEach((el, i) => {
      if (i === indexToShow) {
        el.style.display = "block";
        dots[i].classList.add("dot-active");
      } else {
        el.style.display = "none";
        dots[i].classList.remove("dot-active");
      }
    });
  };
  refreshSlider(slideIndex);
  prev.onclick = () => {
    if (slideIndex > 0) {
      slideIndex--;
      refreshSlider(slideIndex);
    }
  };

  next.onclick = () => {
    if (slideIndex < slides.length - 1) {
      slideIndex++;
      refreshSlider(slideIndex);
    }
  };

  dots.forEach((el, i) => {
    el.onclick = () => {
      slideIndex = i;
      refreshSlider(slideIndex);
    };
  });

  //Calculator

  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.querySelector("#select"),
    totalValue = document.querySelector("#total"),
    personsSum = 0,
    daysSum = 0,
    placeCoef = 0,
    total = 0;

  totalValue.textContent = total;
  placeCoef = place.value;

  const insertTotal = () => {
    totalValue.textContent = total;
  };

  const calculateTotal = () => {
    if (personsSum && daysSum) {
      total = (daysSum + personsSum) * 4000 * placeCoef;
    } else {
      total = 0;
    }
    insertTotal();
  };

  persons.onchange = () => {
    personsSum = +persons.value;
    calculateTotal();
  };

  restDays.onchange = () => {
    daysSum = +restDays.value;
    calculateTotal();
  };

  place.onchange = () => {
    placeCoef = +place.value;
    calculateTotal();
  };
});
