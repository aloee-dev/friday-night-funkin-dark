export function render(ctx, img, frame, shaderName, scale = 1) {
    const scaledW = frame.w * scale;
    const scaledH = frame.h * scale;
    const offX = frame.offsetX; 
    const offY = frame.offsetY; 

    ctx.save();
    
    ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, offX, offY, scaledW, scaledH);

    ctx.save();
    ctx.globalCompositeOperation = "source-atop"; 
    ctx.globalAlpha = 0.75;

    const rimShiftX = -4 * scale; 
    const rimShiftY = -3 * scale;

    ctx.drawImage(
        img, 
        frame.x, frame.y, frame.w, frame.h, 
        offX + rimShiftX, offY + rimShiftY, scaledW, scaledH
    );

    ctx.fillStyle = "#fffdba";
    ctx.fillRect(offX, offY, scaledW, scaledH);
    ctx.restore();
    
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, offX, offY, scaledW, scaledH);

    ctx.restore();
}
