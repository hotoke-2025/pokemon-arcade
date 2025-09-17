import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

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
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [statusText, setStatusText] = useState("Your turn!")
  const [running, setRunning] = useState(true)

  function handleCellClick(index: number) {
    if (options[index] !== '' || !running || currentPlayer !== 'X') return

    const updatedOptions = [...options]
    updatedOptions[index] = 'X'
    setOptions(updatedOptions)

    checkWinner(updatedOptions)
  }

  function changePlayer() {
  const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
  setCurrentPlayer(nextPlayer)

  const nextStatus = nextPlayer === 'X' ? "Your turn!" : "Computer's turn!"
  setStatusText(nextStatus)
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
    if (currentPlayer === 'X') {
      setStatusText('You win!')
      confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#a864fd', '#29cdff', '#78ff44', '#ee73c4', '#fdff6a'],
    })
    } else {
      setStatusText('You lose!')
    }
    setRunning(false)
  } else if (!currentOptions.includes('')) {
    setStatusText('Draw')
    setRunning(false)
  } else {
    changePlayer()
  }
}

  useEffect(() => {
  if (currentPlayer === 'O' && running) {
    const timeout = setTimeout(() => {
      makeComputerMove()
    }, 2000)
    return () => clearTimeout(timeout)
  }
}, [currentPlayer, running])

  function makeComputerMove() {
    const emptyIndices = options
      .map((val, idx) => (val === '' ? idx : null))
      .filter((val) => val !== null) as number[]

    if (emptyIndices.length === 0) return

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    const updatedOptions = [...options]
    updatedOptions[randomIndex] = 'O'
    setOptions(updatedOptions)

    checkWinner(updatedOptions)
  }

  function restartGame() {
    setOptions(Array(9).fill(''))
    setCurrentPlayer('X')
    setStatusText("Your turn!")
    setRunning(true)
  }

  return (
    <div className="text-center">
      <h2 className="m-5">Tic-Tac-Johto</h2>
      <table className="mx-auto">
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col
                return (
                  <td
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className="border-2 border-black w-32 h-32"
                  >
                    {options[index] === 'X' && (
                      <img src="/images/X-Unown.webp" alt="X" />
                    )}
                    {options[index] === 'O' && (
                      <img src="/images/O-Unown.webp" alt="O" />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="m-5">{statusText}</h4>
      <button onClick={restartGame} className="keepPlayingButton">
      Start Again
      </button>
    </div>
  )
}