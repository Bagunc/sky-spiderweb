var SDOC = document;
            
Math.radians = function(degrees) { return degrees * Math.PI / 180; }
Math.degrees = function(radians) { return radians * 180 / Math.PI; }

Number.prototype.toPixel = function(value) { return this + "px"; };
String.prototype.toPixel = function(value) { return this + "px"; }

function SkySpiderweb(e) {
    var self = this;

    this.containers = [];

    this.clear = function(spiderweb) {
        let area = spiderweb ? spiderweb : SDOC;
        Array.from(area.querySelectorAll('.sky-spiderweb-line')).forEach((line) => { line.remove() })
    };

    this.init = function() {
        let spiderwebs = Array.from(SDOC.querySelectorAll('.sky-spiderweb'));

        if (spiderwebs.length) {
            spiderwebs.forEach((spiderweb) => {
                let data = {};

                data.node = spiderweb;

                let dotes_query = spiderweb.querySelectorAll('.sdot');

                if (dotes_query.length) {
                    data.dotes = [];
                    dotes_query.forEach((dote) => {
                        let index = parseInt(dote.getAttribute('data-couple'));

                        if (data.dotes[index] === undefined)
                            data.dotes[index] = []

                        data.dotes[index].push(dote);
                    });
                }

                self.containers.push(data);
            });
        }

        if (self.containers) {
            self.containers.forEach((spiderweb) => {
                self.clear(spiderweb.node);
                if (spiderweb.dotes) {
                   spiderweb.dotes.forEach((dotes) => {
                       let a = dotes[0] ? dotes[0] : null,
                           b = dotes[1] ? dotes[1] : null;

                       self.init_dotes(spiderweb.node, a, b);  
                   });
               }
            });
        }

    };

    this.init_dotes = function(node, a, b) {
        
        if (node.classList.contains('rand-dots')) {
            a.style.backgroundColor = self.rand_color();
            b.style.backgroundColor = self.rand_color();
        }
        
        let pos_a = {
                x: a.offsetLeft,
                y: a.offsetTop,
                width: a.offsetWidth,
                height: a.offsetHeight
            },
            pos_b = {
                x: b.offsetLeft,
                y: b.offsetTop,
                width: b.offsetWidth,
                height: b.offsetHeight  
            },
            triangle = {
                top: undefined,
                bottom: undefined,
                right: undefined,
                left: undefined,
                rightSide: true
            };

        pos_a.x += pos_a.width / 2;
        pos_a.y += pos_a.height / 2;

        pos_b.x += pos_b.width / 2;
        pos_b.y += pos_b.height / 2;

        triangle.top = pos_a.y <= pos_b.y ? pos_a : pos_b,
        triangle.bottom = pos_a.y <= pos_b.y ? pos_b : pos_a,
        triangle.left = pos_a.x <= pos_b.x ? pos_a : pos_b,
        triangle.right = pos_a.x <= pos_b.x ? pos_b : pos_a;

        triangle.rightSide = triangle.bottom.x <= triangle.top.x;

        let side_a,
            side_b,
            side_c,
            angle;

        side_a = triangle.bottom.y - triangle.top.y;
        side_b = triangle.right.x - triangle.left.x;

        side_c = Math.sqrt(Math.pow(side_a, 2) + Math.pow(side_b, 2)); 
        width = side_c * 2; 
        angle = Math.degrees(Math.asin(side_a / side_c));

        if (triangle.rightSide)
            angle *= -1;

        let top = triangle.top.y,
            left = triangle.left.x - width / 2;

        if (triangle.rightSide) {
            top = triangle.bottom.y;
        }

        let line = SDOC.createElement('div');
            line.innerHTML = '<div class="scolor"></div>';
            line.classList.add('sky-spiderweb-line');
            if (triangle.rightSide)
                line.classList.add('reversed');
            line.style.width = width.toPixel();
            if(node.classList.contains('rand-lines')) {
                line.querySelector('.scolor').style.backgroundColor = self.rand_color();
            }
            line.style.top = top.toPixel();                    
            line.style.left = left.toPixel();
            line.style.transform = "rotate(" + angle + "deg)";

        self.draw(node, line);
    }

    this.draw = function(node, line) {                    
        node.appendChild(line);
    };
    
    this.rand_color = function() {
        let letters = '0123456789ABCDEF',
            color = '#';

        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];

        return color;
    };

    this.init();
}

window.addEventListener('load', SkySpiderweb);
window.addEventListener('resize', SkySpiderweb);