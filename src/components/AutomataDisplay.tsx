import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../styles/react-flow.css';
import type { TransitionType } from '../types';

const initialNodes = [
  {
    id: 'A',
    position: { x: -86.6, y: -50 },
    data: { label: 'A' },
    type: 'input',
  },
  {
    id: 'B',
    position: { x: 0, y: -100 },
    data: { label: 'B' },
  },
  {
    id: 'C',
    position: { x: 86.6, y: -50 },
    data: { label: 'C' },
  },
  {
    id: 'D',
    position: { x: 86.6, y: 50 },
    data: { label: 'D' },
    type: 'output',
  },
  {
    id: 'E',
    position: { x: 0, y: 100 },
    data: { label: 'E' },
    type: 'output',
  },
  {
    id: 'F',
    position: { x: -86.6, y: 50 },
    data: { label: 'F' },
    type: 'output',
  }
]

interface EdgeType {
  id: string;
  source: string;
  target: string;
  label: string;
  animated: boolean;
}

function AutomataDisplay({ transitions }: { transitions: TransitionType[]}) {
  const edges: EdgeType[] = transitions.map(transition => ({
    id: transition.id,
    source: transition.source,
    target: transition.target,
    label: transition.label,
    animated: transition.isTransitionValid
  }))

  console.log('Edges:', edges)

  return (
    <div className="automata-container">
      <div className="automata-header">
        <h3>Autómata Finito Determinista</h3>
        <span className="automata-badge">Representación Gráfica</span>
      </div>

      <div className="automata-canvas">
        <ReactFlow nodes={initialNodes} edges={edges}>
          <Background />
        </ReactFlow>
      </div>
    </div>
  )
}

export default AutomataDisplay