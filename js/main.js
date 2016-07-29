/**
 * Отображает или cкрывает навигационное меню
 */
$('.icon-menu').click(function(e) {
    $('.sidebar').toggleClass('active');
    var firstClick = true;

    $(document).bind('click', function(e) {
        // При клике куда угодно, кроме меню - скрывает меню
        if (!firstClick && !$(e.target).closest('.sidebar').length) {
            $('.sidebar').removeClass('active');
            $(document).unbind('click');
        }
        firstClick = false;
        e.preventDefault();
    })
})

/**
 * Добавляет класс-модификатор к активной ссылке.
 */
$('.nav__link').click(function(e) {
    e.preventDefault();
    $('.nav__link').removeClass('nav__link_active');
    $(this).addClass('nav__link_active');
})

/**
 * Функция вкл/выкл активности кноки отправки формы
 */
function checkSubmitEnabled() {
    if ($('.bankcard__input_valid').length == $('.bankcard__input').length) {
        $('.payform__submit').prop('disabled', false);
        $('.payform__submit').animate({'opacity': 1});
    } else {
        $('.payform__submit').prop('disabled', true);
        $('.payform__submit').animate({'opacity': 0.4});
    }
}

/**
 * Переводит фокус на следующий Input
 */
function selectNextInput(elem) {
    var currentIndex = elem.index('.bankcard__input');
    $('.bankcard__input').eq(currentIndex + 1).focus();
}


/**
 * Валидирует значение инпута `elem`
 * При вводе цифр длиной `len` добавляет модификатор _valid иначе _error
 */
function validateNumber(elem, len) {
    var value = elem.val();

    if (value.length != len || value.match(/[^0-9]/g)) {
        elem.addClass('bankcard__input_error');
        elem.removeClass('bankcard__input_valid');
    } else {
        elem.addClass('bankcard__input_valid');
        elem.removeClass('bankcard__input_error');
        selectNextInput(elem);
    }    
    checkSubmitEnabled();
}

/**
 * Устанавливаем обработчик ввода текста для валидации поля "номер карты"
 */
$('.bankcard__number-part').bind('input', function() {
    if (this.value.length === 4) {
        validateNumber($(this), 4);
    } 
});
/**
 * Устанавливаем обработчик потери фокуса для валидации поля "номер карты"
 */
$('.bankcard__number-part').bind('change', function() {
    validateNumber($(this), 4);
});

/**
 * Устанавливаем обработчик ввода текста для валидации поля "cvv"
 */
$('.bankcard__cvv').bind('input', function() {
    if (this.value.length === 3) {
        validateNumber($(this), 3);
    } 
});
/**
 * Устанавливаем обработчик потери фокуса для валидации поля "cvv"
 */
$('.bankcard__cvv').bind('change', function() {
    validateNumber($(this), 3);
});

var timerId;

/**
 * Устанавливаем обработчик валидации поля "держатель карты"
 */
$('.bankcard__owner').bind('input', function() {
    var elem = $(this),
        value = elem.val();

    // Валидируем значение через секунду после того, как пользователь закончил ввод - debounce
    clearTimeout(timerId);
    timerId = setTimeout(function() {
        if (value.length < 4 || value.match(/[^a-zA-Z ]/g)) {
            elem.addClass('bankcard__input_error');
            elem.removeClass('bankcard__input_valid');
        } else {
            elem.addClass('bankcard__input_valid');
            elem.removeClass('bankcard__input_error');
        }
        checkSubmitEnabled();
    }, 1000);
});

/**
 * По нажатию Enter переводит фокус дальше
 */
$('.bankcard__owner').bind('keypress', function(e) {
    if (e.keyCode === 13) {
        selectNextInput($(this));
    }
});