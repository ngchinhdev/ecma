export default class MainView {
    data;
    containerElement = document.querySelector('main');

    renderRow(data) {
        if (!data) return;

        this.data = data;
        this.clear();
        this.markup = this.generateMarkup();
        this.containerElement.insertAdjacentHTML('beforeend', this.markup);
    }

    renderAdd() {
        this.clear();
        this.markup = this.generateMarkupAdd();
        this.containerElement.insertAdjacentHTML('beforeend', this.markup);
    }

    renderUpdate(data) {
        this.data = data;
        this.clear();
        this.markup = this.generateMarkupUpdate(this.data);
        this.containerElement.insertAdjacentHTML('beforeend', this.markup);
    }

    renderSpinner() {
        const markup = `<div class="loader-wrap"><span class="loader"></span></div>`;

        this.clear();
        this.containerElement.insertAdjacentHTML('beforeend', markup);
    }

    clear() {
        this.containerElement.innerHTML = '';
    }
}