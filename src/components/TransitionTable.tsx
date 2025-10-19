import { transitionTableData, transitionTableHeaders } from "../const/InitialValues";

export default function TransitionTable() {
  return (
    <div className="automata-transition-table">
      <table>
        <thead>
          <tr>
            <th></th>
            {transitionTableHeaders.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(transitionTableData).map(([rowLabel, rowValues]) => (
            <tr key={rowLabel}>
              <th>
                {rowLabel}
              </th>
              {rowValues.map((value, index) => (
                <td key={index}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
