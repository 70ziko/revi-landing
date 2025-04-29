import React, { useMemo } from 'react';
import {
  Sigma,
  RandomizeNodePositions,
  RelativeSize,
  ForceAtlas2,
} from "react-sigma";
import Graph from 'sigma';

const graphData = {
  nodes: [
    { id: "n1", label: "Node 1", x: 0, y: 0, size: 3 },
    { id: "n2", label: "Node 2", x: 1, y: 1, size: 2 },
    { id: "n3", label: "Node 3", x: 1, y: 0, size: 1 },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n2", label: "Edge 1" },
    { id: "e2", source: "n1", target: "n3", label: "Edge 2" },
  ],
};

const GraphBackground: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const graphInstance = new Graph(graphData, containerRef.current); 
    graphInstance.addNode("e1", {
        label: 'Node 1',
        x: 0,
        y: 0,
        size: 3,
        color: '#ec5148',
    });
    const sigmaGraph = useMemo(() => {
        // graphInstance.import(graphData);
        return graphInstance;
    }, []);

    return (
        <div style={{
            pointerEvents: 'none',
        }}>
            <Sigma
                graph={sigmaGraph}
                // settings={{
                //     defaultNodeColor: '#ec5148',
                //     defaultEdgeColor: '#ec5148',
                // }}
                >
            {/* <Sigma
                graph={graph}
                settings={{
                    defaultNodeColor: '#ec5148',
                    defaultEdgeColor: '#ec5148',
                    // defaultLabelColor: '#fff',
                    // defaultLabelSize: 12,
                    // defaultLabelHoverColor: '#fff',
                    // defaultLabelHoverBGColor: '#ec5148',
                    // defaultLabelHoverBGOpacity: 0.5,
                }}
            > */}
                <RelativeSize initialSize={15} />
                <RandomizeNodePositions />
                <ForceAtlas2
                    worker={true}
                    barnesHutOptimize={false}
                    scalingRatio={10}
                    strongGravityMode={true}
                    gravity={1}
                    timeout={1000}
                    iterationsPerRender={100}
                    adjustSizes={false}
                / >
                {/* NodeHover, EdgeHover, NodeStyle, EdgeStyle components are likely incompatible with SigmaContainer.
                    Use @react-sigma/core hooks or settings for hover effects and styling. */}
        </Sigma>
    </div>
    )
};

export default GraphBackground;
