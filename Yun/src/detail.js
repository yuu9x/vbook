load('libs.js');

function execute(url) {
    var host = 'https://www.yunxuange.org';
    url = url.replace(/(www|m)\.yunxuange\.org\/yxg\/(\d+)[_\/](\d+)\/?$/, 'www.yunxuange.org/$2_$3/').append('/');
    var doc = Http.get(url).html('gbk');

    var coverImg = $.Q(doc, '#fmimg img').attr('src').mayBeFillHost(host);
    var author = $.Q(doc, '#info p').text().normalizeCN().replace(/作\s*者:/g, '').trim();
    var lastUpdated = $.Q(doc, '#info > p:nth-child(4)').text().normalizeCN().replace('发表时间:', '').trim();

    return Response.success({
        name: $.Q(doc, '#info h1').text(),
        cover: coverImg,
        author: author,
        description: $.Q(doc, '#intro').text(),
        detail: String.format('作者: {0}<br>最后更新: {1}', author, lastUpdated),
        host: host
    });
}

String.prototype.normalizeCN = function() {
    return this.replace(/\uFF1A/, ':').replace(/\u00A0/, ' ');
}