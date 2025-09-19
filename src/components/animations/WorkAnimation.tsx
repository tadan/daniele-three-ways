import { useEffect, useRef } from 'react';
import p5 from 'p5';

const WorkAnimation = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let nodes: Array<{ x: number; y: number; targetX: number; targetY: number; connections: number[] }> = [];
      let time = 0;
      
      p.setup = () => {
        p.createCanvas(p.windowWidth / 3, p.windowHeight);
        
        // Create network nodes like a corporate structure growing like a forest
        for (let i = 0; i < 20; i++) {
          const x = p.random(50, p.width - 50);
          const y = p.random(50, p.height - 50);
          nodes.push({
            x: x,
            y: y,
            targetX: x,
            targetY: y,
            connections: []
          });
        }
        
        // Create connections between nearby nodes
        nodes.forEach((node, i) => {
          nodes.forEach((otherNode, j) => {
            if (i !== j) {
              const distance = p.dist(node.x, node.y, otherNode.x, otherNode.y);
              if (distance < 120 && p.random() > 0.7) {
                node.connections.push(j);
              }
            }
          });
        });
      };

      p.draw = () => {
        p.clear();
        time += 0.01;
        
        // Update node positions with organic movement
        nodes.forEach((node, i) => {
          const noiseX = p.noise(i * 0.1, time) * 100 - 50;
          const noiseY = p.noise(i * 0.1 + 100, time) * 100 - 50;
          node.targetX = node.x + noiseX * 0.5;
          node.targetY = node.y + noiseY * 0.5;
        });
        
        // Draw connections like neural networks/root systems
        p.stroke(142, 76, 36, 0.15); // Green from CSS
        p.strokeWeight(1);
        nodes.forEach((node, i) => {
          node.connections.forEach(connectionIndex => {
            const targetNode = nodes[connectionIndex];
            if (targetNode) {
              // Organic curve like tree branches
              const midX = (node.x + targetNode.x) / 2 + p.sin(time + i) * 20;
              const midY = (node.y + targetNode.y) / 2 + p.cos(time + i) * 20;
              
              p.beginShape();
              p.noFill();
              p.vertex(node.x, node.y);
              p.quadraticVertex(midX, midY, targetNode.x, targetNode.y);
              p.endShape();
            }
          });
        });
        
        // Draw nodes like tree nodes/corporate hierarchy
        nodes.forEach((node, i) => {
          p.fill(142, 76, 36, 0.2);
          p.stroke(142, 76, 36, 0.3);
          p.strokeWeight(2);
          
          const size = 8 + p.sin(time + i) * 3;
          p.circle(node.x, node.y, size);
          
          // Add geometric elements representing "work"
          p.push();
          p.translate(node.x, node.y);
          p.rotate(time + i);
          p.noFill();
          p.rect(-size/2, -size/2, size, size);
          p.pop();
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

  return <div ref={sketchRef} className="absolute inset-0 opacity-25" />;
};

export default WorkAnimation;