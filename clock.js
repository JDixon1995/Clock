//Resources
var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
sound.loop = true;
// Functions to get time and display as a clock

function currentTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    let midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM";
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour);
    document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec;
    let t = setTimeout(function() {
        currentTime()
    }, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}

currentTime();

// Functions for setting alarm

function addZero(time) {
    return (time < 10) ? "0" + time : time;
}

function hoursMenu() {
    let select = document.getElementById("alarmhrs");
    let hrs = 12;
    for (i = 1; i <= hrs; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
hoursMenu();

function minutesMenu() {
    let select = document.getElementById("alarmmins");
    let min = 59;
    for (i = 1; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
minutesMenu();

function secondsMenu() {
    let select = document.getElementById("alarmsecs");
    let sec = 59;
    for (i = 1; i <= sec; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
secondsMenu();

function alarmSet() {
    let hr = document.getElementById("alarmhrs");
    let min = document.getElementById("alarmmins");
    let sec = document.getElementById("alarmsecs");
    let ap = document.getElementById("ampm");

    let selectedHour = hr.options[hr.selectedIndex].value;
    let selectedMin = min.options[hr.selectedIndex].value;
    let selectedSec = sec.options[hr.selectedIndex].value;
    let selectedAP = ap.options[hr.selectedIndex].value;

    let alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + ":" + selectedAP;
    console.log("alarmTime:" + alarmTime);

    document.getElementById("alarmhrs").disabled = true;
    document.getElementById("alarmhmins").disabled = true;
    document.getElementById("alarmsecs").disabled = true;
    document.getElementById("ampm").disabled = true;

    let h2 = document.getElementById("clock");

    setInterval(function() {

        let date = new Date();
        let hours = (12 - (date.getHours()));
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = (date.getHours()) < 12 ? "AM" : "PM";

        if (hours < 0) {
            hours = hours * -1;
        } else if (hours == 00) {
            hours = 12;
        } else {
            hours = hours;
        }

        let currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

        if (alarmTime == currentTime) {
            sound.play();
        }
    }, 1000);

}


function alarmClear() {
    document.getElementById("alarmhrs").disabled = false;
    document.getElementById("alarmmins").disabled = false;
    document.getElementById("alarmsecs").disabled = false;
    document.getElementById("ampm").disabled = false;
    sound.pause();
}