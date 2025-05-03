export default function Log({ turns }) {
  return (
    <ol id="log">
       {turns.map((turn) => (
        <li key={`${turn.sqaure.row} ${turn.sqaure.col}`}>
          {turn.player} Selected {turn.sqaure.row},{turn.sqaure.col}
        </li>
      ))}
    </ol>
)}

