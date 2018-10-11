const HtmlParser = require('../htmlParser.js');
const htmlbuf = require('./html.js');
const assert = require('assert');

describe('it should parse correctly complete', () => {
    it('should parse complex html', () => {
        let htmlParser = new HtmlParser();

        let html = htmlbuf.html;

        htmlParser.parse(html);

    })
})

describe('it should parse a tag', () => {
    it('should parse a meta tag', () => {
        let htmlParser = new HtmlParser();

        let metaTag = 'meta name="description"          content="Expand the largest, most comprehensive, human-reviewed directory of the web"';
        let tag = htmlParser.parseTag(metaTag);

        assert.equal(tag.tag, 'meta');
        assert.equal(tag.attributes[0].name, 'name');

    })
})

