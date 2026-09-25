$(function () {
    // Set the CSS variable on :root rather than on every element.
    // $('*') would apply the change to all elements, which is wasteful
    // and makes the intent unclear.
    document.documentElement.style.setProperty('--selection', '#ff4d00');

    const cards = $('.course-card');
    const output = $('#selector-output');
    const count = $('#selected-count');

    $('.selector-toolbar button').on('click', function () {
        const selector = $(this).data('target');

        cards.removeClass('is-selected');
        const selected = $(selector);
        selected.addClass('is-selected');

        count.text(`${selected.length} selected`);
        output.text(`jQuery found ${selected.length} element(s) with ${selector}`);

        selected.each(function (index) {
            const title = $(this).find('h3').text();
            console.log(`${index + 1}. ${title}`);
        });
    });
});
