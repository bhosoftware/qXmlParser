const EventEmitter = require('events');


class HtmlParser extends EventEmitter {
    parse(html) {
        for(let i=0; i < html.length; i++) {
        
            //check for closing tag
            if(html[i] === '<' && html[i+1] === '/') {
                let closingTag = '';
                i++;
    
                while(i < html.length) {
                    i++;
                    
                    if(html[i] === '>') {
    
                        this.emit("closingTag", closingTag.trim());
                        let ret = this.parseText(html, i)
                        i = ret.i;
                        this.emit("text", ret.text);
                        break;
                    }
    
                    closingTag += html[i];
    
                }
                continue;
            }
    
            //check for starting tag
            if(html[i] === '<') {
                let startingTag = '';
                while(i < html.length) {
                    i++;
                    
                    if(html[i] === '>') {
                        
                        var jsonTag = this.parseTag(startingTag.trim());
                        this.emit("startingTag", jsonTag);
    
                        var parsText = this.parseText.bind(this);
                        i = parsText(html, i)
                        break;
                    }
    
                    startingTag += html[i];
    
                }
                continue;
            }
        }    
    }

    parseText(html, i) {
        let text = '';
        while(i < html.length) {
    
            i++;
    
            if(html[i] === '<') {
                text = text.trim();
                if(text.length > 0)
                    this.emit('text', text);
                i--;
                break;
            }
            text += html[i];
        }
    
        return i;
    
    } 

    parseTag(tagStr) {
        let tag = {
            tag: '',
            attributes: []
        }
    
        let buf = '';
    
        let first = true;
    
        for(let i=0; i<tagStr.length; i++) {
    
            if(tagStr[i] === ' ') {
                if(first) {
                    first = false;
                    buf = '';
                    continue;
                }
            }
    
            if(tagStr[i] === '=') {
                i+=2; //jumping over " or '
    
                var val='';
                while(i < tagStr.length) {
    
                    if(tagStr[i] === '"' || tagStr[i] === "'") {
                        break;
                    }
    
                    val += tagStr[i];
                    i++;
    
                }  
                i++;
                var attr = {
                    name: buf.trim(),
                    value: val
                }
    
                buf = '';
    
                tag.attributes.push(attr);
            }
    
            buf += tagStr[i];
    
            if(first) {
                tag.tag = buf
            }
    
        }
    
        return tag;
    }
}

module.exports = HtmlParser;