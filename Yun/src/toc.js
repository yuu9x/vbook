load('libs.js');

function execute(url) {
    var host = 'https://www.yunxuange.org';
    url = url.replace(/m\.yunxuange\.org\/yxg\/(\d+)\/(\d+)\/?/g, 'www.yunxuange.org/$1_$2/').append('/');
    var doc = Http.get(url).html('gbk');

    var data = [];
    var elems = $.QA(doc, '#list a');
    if (!elems.length) return Response.error(url);
    
    elems.forEach(function(e) {
        data.push({
            name: $.Q(e, 'a').text(),
            url: e.attr('href'),
            host: host
        })
    });

    if (data.length >= 18) {
        data.splice(0, 9); // Remove first 9 items
    } else {
        data.splice(0, data.length / 2);
    }

    return Response.success(data);
}