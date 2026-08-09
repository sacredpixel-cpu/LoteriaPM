import { useRef, useState } from 'react'
import { TITLE_CARD, shuffledDeck } from './data/cards'
import './App.css'

function App() {
  const [deck, setDeck] = useState(null)
  const [index, setIndex] = useState(0)
  const audioRef = useRef(null)

  const started = deck !== null
  const current = started ? deck[index] : null
  const atStart = index === 0
  const atEnd = started && index === deck.length - 1

  function playCard(card) {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = card.audio
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  function handleIniciar() {
    const newDeck = shuffledDeck()
    setDeck(newDeck)
    setIndex(0)
    playCard(newDeck[0])
  }

  function handleRestart() {
    audioRef.current?.pause()
    setDeck(null)
    setIndex(0)
  }

  function handleBack() {
    const newIndex = Math.max(0, index - 1)
    setIndex(newIndex)
    playCard(deck[newIndex])
  }

  function handleForward() {
    const newIndex = Math.min(deck.length - 1, index + 1)
    setIndex(newIndex)
    playCard(deck[newIndex])
  }

  return (
    <div className={`screen${started ? ' screen--game' : ''}`}>
      <audio ref={audioRef} preload="none" />

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
