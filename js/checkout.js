// Display sum monney must pay
const sumMoneyMustPay = sessionStorage.getItem("sumMoneyMustPay");
document.querySelector(".sum span").innerText = sumMoneyMustPay;

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
    let nameReg = /-?\d+/;
    if (nameReg.test(input.value.trim())) {
        isError(input, "Tên không hợp lệ!");
    } else {
        isSuccess(input);
    }
}

function checkPhoneNumber(input) {
    let phoneNumReg = /^0\d{9}$/;
    if (!phoneNumReg.test(input.value)) {
        isError(input, "Số điện thoại không hợp lệ!");
    } else {
        isSuccess(input);
    }
}

function checkEmail(input) {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(input.value)) {
        isError(input, "Email không hợp lệ!");
    } else {
        isSuccess(input);
    }
}

function checkProvinces(input) {
    let isEmty = false;
    if (input.value === "Tỉnh / Thành phố") {
        input.classList.add("error");
        isEmty = true;
        isError(input, "Vui lòng chọn tỉnh thành!");
    } else {
        input.classList.add("success");
        isSuccess(input);
    }
    return isEmty;
}

submitBtn.onclick = function (e) {
    e.preventDefault();
    let isNameEmpty = fullName.value.trim() === "";
    let isPhoneNumEmpty = phoneNum.value.trim() === "";
    let isEmailEmpty = email.value.trim() === "";
    let isAddressEmty = address.value.trim() === "";

    if (isNameEmpty) {
        isError(fullName, "Vui lòng nhập tên!");
    } else {
        checkName(fullName);
    }

    if (isPhoneNumEmpty) {
        isError(phoneNum, "Vui lòng nhập số điện thoại!");
    } else {
        checkPhoneNumber(phoneNum);
    }

    if (isEmailEmpty) {
        isError(email, "Vui lòng nhập địa chỉ email!");
    } else {
        checkEmail(email);
    }

    if (isAddressEmty) {
        isError(address, "Vui lòng nhập địa chỉ!");
    } else {
        isSuccess(address);
    }
    checkProvinces(provinces);
};
