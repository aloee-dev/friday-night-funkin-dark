export function render(ctx, img, frame, shaderName) {
    ctx.save();

    ctx.shadowColor = "#fffdba"; 
    ctx.shadowBlur = 15;        
    ctx.shadowOffsetX = -8;
    ctx.shadowOffsetY = 0;
    
    ctx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        frame.offsetX, frame.offsetY, frame.w, frame.h              
    );
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;

    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = "#fffdba";
    ctx.fillRect(frame.offsetX, frame.offsetY, frame.w, frame.h);
    
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;

    ctx.drawImage(
        img,
        frame.x, frame.y, frame.w, frame.h, 
        frame.offsetX, frame.offsetY, frame.w, frame.h              
    );

    ctx.restore();
}
