import { useState } from 'react'
import { TITLE_CARD, shuffledDeck } from './data/cards'
import './App.css'

function App() {
  const [deck, setDeck] = useState(null)
  const [index, setIndex] = useState(0)

  const started = deck !== null
  const current = started ? deck[index] : null
  const atStart = index === 0
  const atEnd = started && index === deck.length - 1

  function handleIniciar() {
    setDeck(shuffledDeck())
    setIndex(0)
  }

  function handleRestart() {
    setDeck(shuffledDeck())
    setIndex(0)
  }

  function handleBack() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function handleForward() {
    setIndex((i) => Math.min(deck.length - 1, i + 1))
  }

  return (
    <div className="screen">
      {started && (
        <button
          type="button"
          className="icon-button restart-button"
          onClick={handleRestart}
          aria-label="Reiniciar baraja"
          title="Reiniciar baraja"
        >
          &#8635;
        </button>
      )}

      <div className="card-frame">
        <img
          className="card-image"
          src={started ? current.src : TITLE_CARD}
          alt={started ? current.label : 'Lotería'}
        />
      </div>

      {!started && (
        <button type="button" className="primary-button" onClick={handleIniciar}>
          Iniciar
        </button>
      )}

      {started && (
        <div className="nav-buttons">
          <button
            type="button"
            className="icon-button"
            onClick={handleBack}
            disabled={atStart}
            aria-label="Carta anterior"
          >
            &#8592;
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={handleForward}
            disabled={atEnd}
            aria-label="Siguiente carta"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  )
}

export default App
