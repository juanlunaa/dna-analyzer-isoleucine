import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../styles/react-flow.css';
import type { EdgeType, NodeType, TransitionType } from '../types';
import CustomNode from './CustomNode';
// import TransitionTable from './TransitionTable';

const nodeTypes = { custom: CustomNode }

function AutomataDisplay({
  title,
  numCodons,
  transitions,
  nodes
}: {
  title: string,
  numCodons: number,
  transitions: TransitionType[],
  nodes: NodeType[]
}) {

  const edges: EdgeType[] = transitions.map(transition => ({
    id: transition.id,
    source: transition.source,
    target: transition.target,
    label: transition.label,
    animated: transition.isTransitionValid
  }))

  const parsedNodes = nodes.map(node => {
    const isActiveNode = transitions.some(transition => 
      (transition.source === node.id || transition.target === node.id) && transition.isTransitionValid
    )

    return {
      ...node,
      data : {
        ...node.data,
        className: isActiveNode ? 'node-active' : ''
      }
    }
  })

  return (
    <div className="automata-element">
      <div className="automata-element-header">
        <span className="automata-badge">{title}</span>
        <span className="automata-badge">{numCodons}</span>
      </div>

      <div className="automata-canvas">
      <ReactFlow
        nodes={parsedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        panOnScroll={false}
        selectionOnDrag={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        >
        <Background />
      </ReactFlow>
      </div>
    </div>
  )
}

export default AutomataDisplay