import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../styles/react-flow.css';
import type { EdgeType, TransitionType } from '../types';
import { initialNodes } from '../const/InitialValues';
import CustomNode from './CustomNode';
import TransitionTable from './TransitionTable';

const nodeTypes = { custom: CustomNode }

function AutomataDisplay({ transitions }: { transitions: TransitionType[]}) {

  const edges: EdgeType[] = transitions.map(transition => ({
    id: transition.id,
    source: transition.source,
    target: transition.target,
    label: transition.label,
    animated: transition.isTransitionValid
  }))

  const nodes = initialNodes.map(node => {
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
    <div className="automata-container">
      <div className="automata-header">
        <h3>Autómata Finito Determinista</h3>
      </div>

      <div className="automata-elements-container">
        <div className="automata-element">
          <span className="automata-badge">Representación Gráfica</span>
          <div className="automata-canvas">
          <ReactFlow
            nodes={nodes}
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

        <div className="automata-element">
          <span className="automata-badge">Tabla de transiciones</span>
          <TransitionTable />
        </div>
      </div>
    </div>
  )
}

export default AutomataDisplay