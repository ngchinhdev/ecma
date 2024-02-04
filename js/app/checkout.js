import { getProducts } from "../api/apiProducts.js";
import { generateProductToPay } from "./markups/checkoutMarkup.js";

const inputs = document.querySelectorAll(".boxx input");
const selectBox = document.querySelector(".provinces");
const fullName = document.querySelector(".name");
const phoneNum = document.querySelector(".phone_num");
const email = document.querySelector("input.email");
const address = document.querySelector(".address");
const provinces = document.querySelector(".provinces");
const submitBtn = document.querySelector(".buy_btn");

function isError(input, message) {
    let siblingElem = input.nextElementSibling;
    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");
    siblingElem.classList.add("error");
    siblingElem.innerText = message;
}

function isSuccess(input) {
    let siblingElem = input.nextElementSibling;
    input.classList.remove("error");
    input.classList.remove("placeHD");
    input.classList.add("success");
    siblingElem.classList.remove("error");
    siblingElem.innerText = "";
}

function checkName(input) {
    let isEmty = true;
    let nameReg = /-?\d+/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập tên!');
        return false;
    } else if (nameReg.test(input.value.trim())) {
        isEmty = false;
        isError(input, "Tên không hợp lệ!");
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkPhoneNumber(input) {
    let isEmty = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập số điện thoại!');
        return false;
    } else if (!phoneNumReg.test(input.value)) {
        isError(input, "Số điện thoại không hợp lệ!");
        isEmty = false;
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkEmail(input) {
    let isEmty = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value === '') {
        isError(input, 'Vui lòng nhập email!');
        return false;
    } else if (!emailReg.test(input.value)) {
        isError(input, "Email không hợp lệ!");
        isEmty = false;
    } else {
        isSuccess(input);
    }
    return isEmty;
}

function checkAddress(input) {
    let isEmty = true;
    if (input.value == "") {
        isError(address, "Vui lòng nhập địa chỉ!");
        isEmty = false;
    } else {
        isSuccess(address);
    }
    return isEmty;
}

function checkProvinces(input) {
    let isEmty = true;
    if (input.value === "Tỉnh / Thành phố") {
        input.classList.add("error");
        isEmty = false;
        isError(input, "Vui lòng chọn tỉnh thành!");
    } else {
        input.classList.add("success");
        isSuccess(input);
    }
    return isEmty;
}

submitBtn.onclick = function (e) {
    e.preventDefault();
    if (!(checkName(fullName) && checkPhoneNumber(phoneNum) && checkEmail(email) &&
        checkAddress(address) && checkProvinces(provinces))) {
        checkName(fullName);
        checkPhoneNumber(phoneNum);
        checkEmail(email);
        checkAddress(address);
        checkProvinces(provinces);
    } else {
        window.location.href = 'success-payment.html';
    }
};

// Show products to pay
const params = new URLSearchParams(window.location.search);
const idProd = params.get('id');
const quantity = params.get('quantity');

const productContainer = document.querySelector('.sum_rows');

async function getProductsToPay() {
    if (idProd && quantity) {
        const product = await getProducts(idProd);

        await generateProductToPay([{ ...product, quantityPay: quantity }], productContainer);
    } else {
        const cartData = JSON.parse(localStorage.getItem('cart'));

        const promises = cartData.map(async cart => {
            const product = await getProducts(cart.id);

            return { ...product, quantityPay: cart.quantity };
        });

        let productCarts = await Promise.all(promises);
        await generateProductToPay(productCarts, productContainer);
    }
}

getProductsToPay();