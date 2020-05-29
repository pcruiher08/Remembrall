$('#search-btn').on('click', function() {
    console.log('PTM');
    if ($('#search-field').val() === '') return;
    let params = {
        query : $('#search-field').val()
    }
    let url = '/search?' + $.param(params);
    document.location.href = url;
});