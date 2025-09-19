import { useEffect, useRef } from 'react';
import p5 from 'p5';

const DriveAnimation = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let rings: Array<{ radius: number; rotation: number; speed: number; opacity: number }> = [];
      
      p.setup = () => {
        p.createCanvas(p.windowWidth / 3, p.windowHeight);
        p.noFill();
        
        // Create concentric rings like tree rings/hard drive platters
        for (let i = 0; i < 8; i++) {
          rings.push({
            radius: 50 + i * 40,
            rotation: 0,
            speed: 0.002 + i * 0.0005,
            opacity: 0.1 + i * 0.02
          });
        }
      };

      p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        
        rings.forEach(ring => {
          p.stroke(280, 100, 70, ring.opacity); // Purple from CSS
          p.strokeWeight(1);
          
          p.push();
          p.rotate(ring.rotation);
          
          // Draw organic tree ring with subtle variations
          p.beginShape();
          for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
            const noise = p.noise(angle * 2, ring.radius * 0.01, p.frameCount * 0.01) * 10;
            const x = (ring.radius + noise) * p.cos(angle);
            const y = (ring.radius + noise) * p.sin(angle);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
          
          // Add radial lines like hard drive sectors
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * p.TWO_PI;
            const startRadius = ring.radius - 15;
            const endRadius = ring.radius + 15;
            p.line(
              startRadius * p.cos(angle),
              startRadius * p.sin(angle),
              endRadius * p.cos(angle),
              endRadius * p.sin(angle)
            );
          }
          
          p.pop();
          
          ring.rotation += ring.speed;
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 3, p.windowHeight);
      };
    };

    p5Instance.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return <div ref={sketchRef} className="absolute inset-0 opacity-30" />;
};

export default DriveAnimation;