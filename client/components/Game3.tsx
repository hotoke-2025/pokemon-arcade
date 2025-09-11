import { useState } from 'react'

export default function Game3() {
  // Similar variables to the original code
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [options, setOptions] = useState(Array(9).fill(''))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [statusText, setStatusText] = useState("X's turn")
  const [running, setRunning] = useState(true)

  function handleCellClick(index: number) {
    if (options[index] !== '' || !running) return

    const updatedOptions = [...options]
    updatedOptions[index] = currentPlayer
    setOptions(updatedOptions)

    checkWinner(updatedOptions)
  }

  function changePlayer() {
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)
    setStatusText(`${nextPlayer}'s turn`)
  }

  function checkWinner(currentOptions: string[]) {
    let roundWon = false
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i]
      const cellA = currentOptions[a]
      const cellB = currentOptions[b]
      const cellC = currentOptions[c]

      if (cellA === '' || cellB === '' || cellC === '') continue

      if (cellA === cellB && cellB === cellC) {
        roundWon = true
        break
      }
    }

    if (roundWon) {
      setStatusText(`${currentPlayer} won!`)
      setRunning(false)
    } else if (!currentOptions.includes('')) {
      setStatusText('Draw')
      setRunning(false)
    } else {
      changePlayer()
    }
  }

  function restartGame() {
    setOptions(Array(9).fill(''))
    setCurrentPlayer('X')
    setStatusText("X's turn")
    setRunning(true)
  }

  return (
    <div className="text-center">
      <h2 className="m-5">Tic-Tac-Johto</h2>
      <table className= "mx-auto">
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col
                return (
                  <td
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className='border-2 border-black w-32 h-32'
                  >
                    {options[index] === 'X' && (
                      <img
                        src="images/X-Unown.webp"
                        alt="X"
                      />
                    )}
                    {options[index] === 'O' && (
                      <img
                        src="images/O-Unown.webp"
                        alt="O"
                      />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="m-5" >{statusText}</h2>
      <button onClick={restartGame} className="mb-5">Restart Game</button>
    </div>
  )
}
