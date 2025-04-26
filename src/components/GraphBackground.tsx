import React, { useEffect, useRef } from 'react';
import * as Ogma from 'ogma';

const GraphBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ogmaRef = useRef<Ogma.Ogma | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Initialize Ogma
    ogmaRef.current = new Ogma.Ogma({
      container: container,
      style: {
        nodes: {
          size: 5,
          fill: '#3d52a0',
          stroke: '#ffffff',
          strokeWidth: 1,
        },
        edges: {
          stroke: '#10b981',
          strokeWidth: 1,
        },
      },
    });
    const ogma = ogmaRef.current!;

    // Add initial nodes at random positions
    const result = ogma.addNodes(30, {
      x: () => Math.random() * width,
      y: () => Math.random() * height,
    });
    const nodes = result.nodes as string[];

    // Connect each node to a random neighbor
    nodes.forEach((n: string) => {
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      if (target !== n) {
        ogma.addEdge({ source: n, target });
      }
    });

    // Click handler to add a node and connect to nearest neighbors
    const handleClick = (e: MouseEvent) => {
      if (!ogma || !container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newNode = ogma.addNode({ x, y }) as string;

      // Find nearest two neighbors
      const allNodes = ogma.getNodes() as string[];
      const others = allNodes.filter((id) => id !== newNode);
      const distances = others
        .map((id) => {
          const pos = ogma.getNodeLocation(id)!;
          return { id, dist: Math.hypot(pos.x - x, pos.y - y) };
        })
        .sort((a, b) => a.dist - b.dist);
      distances.slice(0, 2).forEach((nbr) => {
        ogma.addEdge({ source: newNode, target: nbr.id });
      });
    };

    // Listen to global clicks to add nodes
    window.addEventListener('click', handleClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('click', handleClick);
      ogma.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GraphBackground;
