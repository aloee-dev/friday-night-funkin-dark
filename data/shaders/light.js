let offscreenCanvas = null;
let offscreenCtx = null;

export function render(ctx, img, frame, shaderName) {
    if (!offscreenCanvas) {
        offscreenCanvas = document.createElement('canvas');
        offscreenCtx = offscreenCanvas.getContext('2d');
    }
    
    offscreenCanvas.width = frame.w;
    offscreenCanvas.height = frame.h;
    offscreenCtx.clearRect(0, 0, frame.w, frame.h);

    ctx.save();

    offscreenCtx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        0, 0, frame.w, frame.h              
    );
    offscreenCtx.globalCompositeOperation = "source-atop";
    offscreenCtx.fillStyle = "#fffdba";
    offscreenCtx.fillRect(0, 0, frame.w, frame.h);

    ctx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        frame.offsetX, frame.offsetY, frame.w, frame.h              
    );
    ctx.save();
    ctx.globalAlpha = 0.54;
    ctx.drawImage(offscreenCanvas, frame.offsetX, frame.offsetY);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "#fffc76"; 
    ctx.shadowBlur = 15;        
    ctx.shadowOffsetX = -8;
    ctx.shadowOffsetY = 0;
    ctx.globalCompositeOperation = "destination-over";

    ctx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        frame.offsetX, frame.offsetY, frame.w, frame.h              
    );
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        frame.offsetX, frame.offsetY, frame.w, frame.h              
    );
    ctx.restore();

    ctx.restore();
}
