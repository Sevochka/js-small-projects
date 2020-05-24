class DOMElement {
    constructor(elementName, style, textContent, parent) {
        this.elementName = elementName;
        this.style = style;
        this.textContent = textContent;
        this.parent = document.querySelector(parent);
    }

    createDOMElement() {
        let element = document.createElement(this.elementName);
        element.textContent = this.textContent;
        let style = 
            JSON.stringify(this.style)
            .slice(1, -1)
            .replace(/,/gi,';')
            .replace(/"/gi, '')
            .replace(/'/gi, '')

        console.log(style);
        element.style.cssText = style;
        this.element = element;
    }

    insertDOMElement(){
        this.parent.appendChild(this.element)
    }
}

let el = new DOMElement('div', {background: 'red', 'text-align': 'center', height: '100px', width: '300px'}, 'hello', '.container');
el.createDOMElement();
el.insertDOMElement();
