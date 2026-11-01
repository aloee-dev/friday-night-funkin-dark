const osC = document.createElement('canvas');
const osCtx = osC.getContext('2d');

export function render(ctx, img, frame, shaderName, scale = 1) {
    const scaledW = frame.w * scale;
    const scaledH = frame.h * scale;
    const offX = frame.offsetX; 
    const offY = frame.offsetY; 

    osC.width = frame.w;
    osC.height = frame.h;
    osCtx.clearRect(0, 0, frame.w, frame.h);

    osCtx.drawImage(
        img, 
        frame.x, frame.y, frame.w, frame.h, 
        0, 0, frame.w, frame.h
    );

    osCtx.save();
    osCtx.globalCompositeOperation = "source-in";
    osCtx.fillStyle = "#fffdba";
    osCtx.fillRect(0, 0, frame.w, frame.h);
    osCtx.restore();

    ctx.save();
    
    ctx.drawImage(
        img, 
        frame.x, frame.y, frame.w, frame.h, 
        offX, offY, scaledW, scaledH
    );

    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.65;

    const rimShiftX = -5 * scale; 
    const rimShiftY = -3 * scale;

    ctx.drawImage(
        osC, 
        0, 0, frame.w, frame.h, 
        offX + rimShiftX, offY + rimShiftY, scaledW, scaledH
    );

    ctx.restore();
}
