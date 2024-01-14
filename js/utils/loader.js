export function loader(parent, time = 0) {
    parent.insertAdjacentHTML('beforeend', '<div class="loader"></div>');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}