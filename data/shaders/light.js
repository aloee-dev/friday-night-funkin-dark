export function render(ctx, img, frame, shaderName, scale = 1) {
    const scaledW = frame.w * scale;
    const scaledH = frame.h * scale;
    const offX = frame.offsetX; 
    const offY = frame.offsetY; 

    ctx.save();
    
    ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, offX, offY, scaledW, scaledH);

    ctx.globalCompositeOperation = "source-atop"; 
    ctx.globalAlpha = 0.54;
    ctx.fillStyle = "#fffdba";
    ctx.fillRect(offX, offY, scaledW, scaledH);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.75;

    const rimShiftX = -4 * scale; 
    const rimShiftY = -3 * scale;

    ctx.drawImage(
        img, 
        frame.x, frame.y, frame.w, frame.h, 
        offX + rimShiftX, offY + rimShiftY, scaledW, scaledH
    );

    ctx.restore();
}
