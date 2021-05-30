import '../index.html';

// Функция удаления классов из элемента
function cleanSelectClasses (elem) {
    return $(elem).removeClass('icon-ru').removeClass('icon-en')
}

// ф-ция отображения элементов select
function makeSelect() {
    let select = cleanSelectClasses('.country');
    select.addClass(select.val() == '1' ? 'icon-ru' : 'icon-en');
    select.css({ height: 'auto', overflow: 'hidden', zIndex: '30000' });
    //  событие ухода мыши с элемента
    select.on('mouseleave', function () {
        this.size = 1; // отображение одного option у select
        cleanSelectClasses(this).addClass($(this).val() == '1' ? 'icon-ru' : 'icon-en');
    });
    //событие наведения мышки на элемент
    select.on('mouseover', function () {
        cleanSelectClasses(this);
        this.size = $(this).find('option').length; // отображение всех option у select
    });
}
// запуск ф-ции отображения элементов select сразу после загрузки страницы
$(function () {
    makeSelect();
});
