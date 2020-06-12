var form = $("#contact-form");

//event listeners
form.addEventListener('blur', validateInput, true);
form.addEventListener('focus', readyInput, true);
form.addEventListener('focus', formCharCounter, true);
form.addEventListener('keyup', formCharCounter, true);
form.addEventListener('keydown', formCharCounter, true);

//error messages
var errorMsg = {
    invalid: 'Invalid input.',
    required: 'This field is required.',
    url: 'Invalid url.',
    email: 'E-mail is invalid.',
    tooShort: 'Input is too short.',
    tooLong: 'Input is too long.'
    // pwd: 'Incorrect format'
};

//regex stuff
var pattern = {
    name: /[A-Za-z -']$/,
    passpatt: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/,
    email: /^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$/,
    url: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/
};

//a few utitlies
var input = {
    say: function (el, msg, visible) {
        var field = $(el);

        field.textContent = msg;
        field.style.opacity = visible;
    },
    show: function (el) {
        return el.style.opacity = '1';
    },
    hide: function (el) {
        return el.style.opacity = '0';
    }
};

//validation 
function validateInput(e) {
    var commentMin = e.target.getAttribute('min-length');
    var commentMax = e.target.getAttribute('max-length');
    var applyValid = 'text-indent: 0; border-bottom: 3px solid rgba(0, 163, 136, 0.95); color: rgba(0, 163, 136, 0.95);';
    var applyError = 'text-indent: 0; border-bottom: 3px solid rgba(242, 48, 65, 0.95); color: rgba(242, 48, 65, 0.95);';

    //hide char counter
    input.hide($('.' + e.target.parentNode.className + ' .char-counter'));

    //Align labels
    if (e.target.tagName.toLowerCase() === 'input') {
        ($('.' + e.target.parentNode.className + ' label')).style.marginTop = '-90px';
    } else if (e.target.tagName.toLowerCase() === 'textarea') {
        ($('.' + e.target.parentNode.className + ' label')).style.marginTop = '-105px';
    }

    if (e.target.tagName.toLowerCase() === 'input' && e.target.type !== 'submit') {
        //test input fields, probably better targeting input classes/id
        //if the form happens to have multiple fields of the same type
        if ((e.target.type) === 'text') {
            if (pattern.name.test(e.target.value) === true && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', '', 0);
                e.target.style.cssText = applyValid;
                return true;
            } else if (pattern.name.test(e.target.value) === false && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.invalid, 1);
                e.target.style.cssText = applyError;
                return false;
            }
        } else if ((e.target.type) === 'email') {
            if (pattern.email.test(e.target.value) === true && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', '', 0);
                e.target.style.cssText = applyValid;
                return true;
            } else if (pattern.email.test(e.target.value) === false && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.email, 1);
                e.target.style.cssText = applyError;
                return false;
            }
        }
            else if ((e.target.type) === 'password') {
            if (pattern.passpatt.test(e.target.value) === true && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', '', 0);
                e.target.style.cssText = applyValid;
                return true;
            } else if (pattern.passpatt.test(e.target.value) === false && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification','Incorrect format', 1);
                e.target.style.cssText = applyError;
                return false;
            }
        }

         else if ((e.target.type) === 'url' && e.target.value !== '') {
            if (pattern.url.test(e.target.value) && e.target.value !== '') {
                input.say('.' + e.target.parentNode.className + ' .notification', '', 0);
                e.target.style.cssText = applyValid;
                return true;
            } else if (!pattern.url.test(e.target.value)) {
                input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.url, 1);
                e.target.style.cssText = applyError;
                return false;
            }
        }
    } else if (e.target.tagName.toLowerCase() === 'textarea') {
        if (e.target.value !== '' && (e.target.value.length >= commentMin && e.target.value.length <= commentMax)) {
            input.say('.' + e.target.parentNode.className + ' .notification', '', 0);
            e.target.style.cssText = applyValid;
            return true;
        } else if (e.target.value !== '' && e.target.value.length < commentMin) {
            input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.tooShort, 1);
            e.target.style.cssText = applyError;
            return false;
        } else if (e.target.value !== '' && e.target.value.length > commentMax) {
            input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.tooLong, 1);
            e.target.style.cssText = applyError;
            return false;
        }
    }

    //if fields are empty except url which is optional
    if (e.target.value === '' && e.target.type !== 'submit') {
        if (e.target.type === 'url') {
            input.hide($('.' + e.target.parentNode.className + ' .notification'));
            e.target.style.cssText = applyValid;
            e.target.placeholder = 'n/a';
            return true;
        } else {
            input.say('.' + e.target.parentNode.className + ' .notification', errorMsg.required, 1);
            e.target.style.cssText = applyError;
            return false;
        }
    }
}

// hide notification and reveal char count
function readyInput(e) {
    if ((e.target.tagName.toLowerCase() === 'input') || (e.target.tagName.toLowerCase() === 'textarea')) {
        input.hide($('.' + e.target.parentNode.className + ' .notification'));
        input.show($('.' + e.target.parentNode.className + ' .char-counter'));
        e.target.style.cssText = 'text-indent: 0; border-bottom: 3px solid  rgba(0, 161, 217, 1); color: #777;'
    }
}

//apply char count
function formCharCounter(e) {
    if ((e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') && e.target.type !== 'submit') {
        textCounter($('.' + e.target.className), $('.' + e.target.parentNode.className + ' .char-counter'));
    }
}

//char count
function textCounter(field, counter) {
    var maxLength = field.getAttribute('max-length');

    if (field.value.length > maxLength) {
        field.value = field.value.substring(0, maxLength);
    } else {
        counter.textContent = maxLength - field.value.length + "/" + maxLength + ' chars';
    }
}

function $(q) {
    return document.querySelector(q);
}

form = $("#test");

//event listeners
form.addEventListener('click', testfunc, true);
  var r = document.getElementById("contactform");
r.style.display = "none";
function testfunc() {
  if (r.style.display == "none") {
    r.style.display = "block";
  } else {
    r.style.display = "none";
  }  
}