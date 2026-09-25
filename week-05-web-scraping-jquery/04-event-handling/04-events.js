$(function () {
    let clicks = 0;

    $('#count-button').on('click', function (event) {
        clicks += 1;
        $('#click-output').text(`${clicks} click${clicks === 1 ? '' : 's'} recorded.`);
        $(this).text('Clicked ' + clicks + ' times');
        console.log(event);
    });

    $('#mood-select').on('change', function () {
        const mood = $(this).val();
        const message = mood || 'Please choose a mood.';
        $('#mood-output').text(message);
    });

    $('#inspect-button').on('click', function (event) {
        $('#event-output').text(
            `event.type: ${event.type}\nevent.which: ${event.which}\nthis: ${this.tagName.toLowerCase()}`
        );
    });

    let buttonNumber = 2;

    $('#add-button').on('click', function () {
        buttonNumber += 1;
        const button = $('<button>', {
            class: 'dynamic-button',
            text: `Button ${buttonNumber}`,
            'data-message': `Button ${buttonNumber} was created dynamically`
        });
        $('#button-rack').append(button);
    });

    $('#button-rack').on('click', '.dynamic-button', function () {
        $('#delegation-output').text($(this).data('message'));
    });
});
