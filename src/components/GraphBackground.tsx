import React from "react";
import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  LoadJSON,
  LoadGEXF,
  Filter,
  ForceAtlas2,
  RelativeSize,
  NOverlap,
  NeoCypher,
  NeoGraphItemsProducers,
  RandomizeNodePositions,
  SigmaEnableWebGL,
} from "@react-sigma/core";
import Graph from "graphology";

const GraphBackground: React.FC = () => {
  const graphInstance = new Graph();
  graphInstance.addNode("e1", {
    label: "Node 1",
    x: 0,
    y: 0,
    size: 3,
    color: "#ec5148",
  });

  return (
    <div
      style={{
        pointerEvents: "none",
      }}
    >
      <Sigma
        renderer="webgl"
        settings={({
          renderLabels: false,
          hideEdgesOnMove: false,
          dragTimeout: 50,
          defaultNodeColor: "#ec5148",
          defaultEdgeColor: "#ec5148",
        } as any)}
      >
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
        />
        {/* <EdgeShapes default="tapered" />
        <NodeShapes default="star" /> */}
        <LoadJSON path="./upwork.json">
          <RandomizeNodePositions>
            <ForceAtlas2
              iterationsPerRender={1}
              linLogMode
              timeout={10000}
              worker
            />
            <RelativeSize initialSize={15} />
          </RandomizeNodePositions>
        </LoadJSON>
      </Sigma>
    </div>
  );
};

export default GraphBackground;
