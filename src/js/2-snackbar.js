
import iziToast from "izitoast";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", event => {
    event.preventDefault();

    const delay = event.currentTarget.elements.delay.value;
    const state = event.currentTarget.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (state) {
                case "fulfilled": {
                    resolve(delay);

                    break;
                }
                case "rejected": {
                    reject(delay);

                    break;
                }
            }
        }, delay);
    });

    promise
        .then((delay) => {
            iziToast.success({
                title: "✅",
                message: `Fulfilled promise in ${delay}ms`,
                position: "topRight",
                icon: "",
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: "❌",
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
                icon: "",
            });
        });
});