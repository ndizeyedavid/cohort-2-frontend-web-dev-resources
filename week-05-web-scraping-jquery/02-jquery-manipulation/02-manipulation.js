$(function () {
    const title = $('#preview-title');
    const copy = $('#preview-copy');
    const preview = $('.preview-card');
    const status = $('#status');
    const attributePreview = $('#attribute-preview');
    const createdList = $('#created-list');
    let itemNumber = 1;

    $('#change-text').on('click', function () {
        title.text('Text changed with .text()');
        copy.text('text() sets plain text and keeps HTML tags as text.');
        status.text('text()');
    });

    $('#change-html').on('click', function () {
        copy.html('inner content with <strong>bold HTML</strong> added through .html().');
        status.text('html()');
    });

    $('#change-attribute').on('click', function () {
        preview.attr('data-state', 'updated');
        attributePreview.text('data-state="updated"');
        status.text('attr()');
    });

    $('#add-class').on('click', function () {
        preview.addClass('is-highlighted');
        status.text('addClass()');
    });

    $('#toggle-class').on('click', function () {
        preview.toggleClass('is-compact');
        status.text('toggleClass()');
    });

    $('#change-css').on('click', function () {
        title.css({
            color: '#d94841',
            'font-style': 'italic'
        });
        status.text('css()');
    });

    $('#add-element').on('click', function () {
        itemNumber += 1;
        const item = $('<li>', {
            text: `Created item ${itemNumber}`,
            class: 'new-item'
        });
        createdList.append(item);
        status.text('createElement through $()');
    });

    $('#remove-element').on('click', function () {
        const items = createdList.children('li');
        items.last().remove();
        status.text('remove()');
    });
});
