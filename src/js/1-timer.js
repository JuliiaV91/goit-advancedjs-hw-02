
import flatpickr from "flatpickr";
import iziToast from "izitoast";


const startBtnEl = document.querySelector("[data-start]");
const inputEl = document.querySelector("#datetime-picker");
startBtnEl.disabled = true;

let userSelectedDate = null;

const timer = {
    deadline: null,
    intervalId: null,
    elements: {
        days: document.querySelector("[data-days]"),
        hours: document.querySelector("[data-hours]"),
        minutes: document.querySelector("[data-minutes]"),
        seconds: document.querySelector("[data-seconds]"),
    },

    start() {
        startBtnEl.disabled = true;
        inputEl.disabled = true;

        this.intervalId = setInterval(() => {
            const diff = this.deadline.getTime() - Date.now();

            if (diff <= 0) {
                this.stop();
                this.updateUI(0, 0, 0, 0);
                iziToast.success({
                    title: "Timer Finished",
                    message: "The countdown has reached the end!",
                    position: "topRight",
                });
                inputEl.disabled = false;
                return;
            }

            const { days, hours, minutes, seconds } = this.convertMs(diff);
            this.updateUI(days, hours, minutes, seconds);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },

    updateUI(days, hours, minutes, seconds) {
        this.elements.days.textContent = this.pad(days);
        this.elements.hours.textContent = this.pad(hours);
        this.elements.minutes.textContent = this.pad(minutes);
        this.elements.seconds.textContent = this.pad(seconds);
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    },

    pad(value) {
        return String(value).padStart(2, "0");
    },
};

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (!selectedDate || selectedDate <= new Date()) {
            iziToast.error({
                title: "Invalid Date",
                message: "Please choose a date in the future",
                position: "topRight",
            });
            startBtnEl.disabled = true;
            return;
        }

        iziToast.success({
            title: "Valid Date",
            message: "You can now start the countdown!",
            position: "topRight",
        });

        userSelectedDate = selectedDate;
        timer.deadline = selectedDate;
        startBtnEl.disabled = false;
    },
});

startBtnEl.addEventListener("click", () => timer.start());
