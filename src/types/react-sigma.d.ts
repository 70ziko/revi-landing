declare module 'react-sigma' {
  import React from 'react';
  import Graph from 'sigma';
  import { Settings } from 'sigma/settings';

  interface SigmaProps {
    graph?: Graph;
    settings?: Settings;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClickNode?: (event: { data: { node: Node } }) => void;
  }

  export const Sigma: React.FC<SigmaProps>;

  interface RandomizeNodePositionsProps {
    randomize?: boolean;
    onRandomize?: () => void;
    onRandomizeEnd?: () => void;
  }
  export const RandomizeNodePositions: React.FC<RandomizeNodePositionsProps>;

  interface RelativeSizeProps { initialSize: number; }
  export const RelativeSize: React.FC<RelativeSizeProps>;

  interface ForceAtlas2Props {
    worker?: boolean;
    barnesHutOptimize?: boolean;
    scalingRatio?: number;
    strongGravityMode?: boolean;
    gravity?: number;
    timeout?: number;
    iterationsPerRender?: number;
    adjustSizes?: boolean;
  }
  export const ForceAtlas2: React.FC<ForceAtlas2Props>;

  interface NodeHoverProps {
    children?: React.ReactNode;
  }
  export const NodeHover: React.FC<NodeHoverProps>;
  export const EdgeHover: React.FC<NodeHoverProps>;
  export const NodeStyle: React.FC<NodeHoverProps>;
  export const EdgeStyle: React.FC<NodeHoverProps>;
}
