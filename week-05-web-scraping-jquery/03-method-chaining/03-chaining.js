$(function () {
    let runCount = 0;

    $('#run-chain').on('click', function () {
        runCount += 1;

        $('.chain-target')
            .text(`Updated by chain ${runCount}`)
            .addClass('is-complete')
            .css('opacity', 1);

        $('#chain-result').text(`The chain ran ${runCount} time(s).`);
    });
});
