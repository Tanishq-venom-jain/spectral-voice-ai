
import { useEffect, useRef } from "react";

export const GeometricShapes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'triangle' | 'square' | 'hexagon';
      opacity: number;
    }> = [];

    // Create shapes
    for (let i = 0; i < 20; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 50 + 20,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: ['triangle', 'square', 'hexagon'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'hexagon',
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size * 0.866, y + size * 0.5);
      ctx.lineTo(x + size * 0.866, y + size * 0.5);
      ctx.closePath();
    };

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.rect(x - size/2, y - size/2, size, size);
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 * Math.PI) / 180;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        const gradient = ctx.createLinearGradient(-shape.size, -shape.size, shape.size, shape.size);
        gradient.addColorStop(0, `rgba(34, 211, 238, ${shape.opacity})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${shape.opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        switch (shape.type) {
          case 'triangle':
            drawTriangle(ctx, 0, 0, shape.size);
            break;
          case 'square':
            drawSquare(ctx, 0, 0, shape.size);
            break;
          case 'hexagon':
            drawHexagon(ctx, 0, 0, shape.size);
            break;
        }

        ctx.stroke();
        ctx.restore();

        shape.rotation += shape.rotationSpeed;
        shape.y += 0.5;
        
        if (shape.y > canvas.height + shape.size) {
          shape.y = -shape.size;
          shape.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  );
};
