const familyName = document.querySelector("input[name=ho]");
const firstName = document.querySelector("input[name=ten]");
const email = document.querySelector("input[name=email]");
const phoneNum = document.querySelector("input[name=phone]");
const password = document.querySelector("input[name=password]");
const repass = document.querySelector("input[name=repass]");
const formLogin = document.querySelector("form.form-login");
const formRegister = document.querySelector("form.form-register");

function isError(input, message) {
    let siblingElem = input.nextElementSibling;
    input.classList.add("error");
    input.classList.add("placeHD");
    input.classList.remove("success");
    console.log(input);
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

function checkName(input, type) {
    let isTrue = true;
    let nameReg = /-?\d+/;
    if (input.value === '') {
        isError(input, `(*) Vui lòng nhập ${type}!`);
        return false;
    } else if (nameReg.test(input.value.trim())) {
        isTrue = false;
        isError(input, `${type} không hợp lệ!`);
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkPhoneNumber(input) {
    let isTrue = true;
    let phoneNumReg = /^0\d{9}$/;
    if (input.value && !phoneNumReg.test(input.value)) {
        isError(input, "(*) Số điện thoại không hợp lệ!");
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkEmail(input) {
    let isTrue = true;
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value === '') {
        isError(input, '(*) Vui lòng nhập email!');
        return false;
    } else if (!emailReg.test(input.value)) {
        isError(input, "(*) Email không hợp lệ!");
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkPassword(input) {
    let isTrue = true;
    if (input.value === '') {
        isError(input, '(*) Vui lòng nhập mật khẩu!');
        return false;
    } else if (input.value.length < 5) {
        isError(input, '(*) Vui lòng nhập nhiều hơn 5 ký tự!');
        isTrue = false;
    } else {
        isSuccess(input);
    }
    return isTrue;
}

function checkCfPassword(pw, cfpw) {
    let isTrue = true;
    if (cfpw.value === '') {
        isError(cfpw, '(*) Vui lòng xác nhận mật khẩu!');
        return false;
    } else if (pw.value !== cfpw.value) {
        isError(cfpw, '(*) Mật khẩu không trùng khớp!');
        isTrue = false;
    } else {
        isSuccess(cfpw);
    }
    return isTrue;
}

formLogin && formLogin.addEventListener('submit', function (e) {
    if (!(checkEmail(email) && checkPassword(password))) {
        e.preventDefault();
        checkEmail(email);
        checkPassword(password);
    }
});

formRegister && formRegister.addEventListener('submit', function (e) {
    if (!(checkEmail(email) && checkPassword(password) && checkPhoneNumber(phoneNum) &&
        checkName(familyName, "Họ") && checkName(firstName, "Tên") && checkCfPassword(password, repass))) {
        e.preventDefault();
        checkEmail(email);
        checkPassword(password);
        checkPhoneNumber(phoneNum);
        checkName(familyName, "Họ");
        checkName(firstName, "Tên");
        checkCfPassword(password, repass);
    }
});


