function createBackgroundImage(options){
    "use strict";
    var bgCanvas = document.getElementById('background-canvas'),
        bgContext = bgCanvas.getContext('2d'),
        bgImage = document.getElementById('main-background');

    bgCanvas.width = options.width;
    bgCanvas.height = options.height;

    function render(){
        var self =this;
        self.context.clearRect(0,0,bgCanvas.width, bgCanvas.height);

        // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        self.context.drawImage(
            self.image,
            self.canvasX,
            self.canvasY
        );

        self.context.drawImage(
            self.image,
            self.width - Math.abs(self.canvasX),
            self.canvasY
        );

        return self;
    }

    function update(){
            var self = this;
            self.canvasX -= ( self.defaultSpeed + level);

            if(self.width - Math.abs(self.canvasX) <= 0){
                self.canvasX = 0;
            }

            return self;
    }

    var background = {
        context: bgContext,
        canvas: bgCanvas,
        image: bgImage,
        width: bgImage.width,
        height: bgImage.height,
        canvasX: 0,
        canvasY: 0,
        render: render,
        update: update,
        defaultSpeed: 4
    };

    return background;
}