load('libs.js');

function execute(url) {
    // https://m.yunxuange.org/yxg/895_895901 ---> https://yunxuange.org/yxg/895_895901
    url = url.replace(/m\.yunxuange\.org\/yxg\/(\d+)\/(\d+)\/?/g, 'www.yunxuange.org/yxg/$1_$2/');
    var doc = Http.get(url).html('gbk');
    var htm = $.Q(doc, '#content').html();

    htm = cleanHtml(htm);

    return Response.success(htm);
}