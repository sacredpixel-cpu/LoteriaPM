import { useEffect, useRef, useState } from 'react'
import { TITLE_CARD, shuffledDeck } from './data/cards'
import './App.css'

const AUTO_OPTIONS = [
  { label: 'Off', value: null },
  { label: '3', value: 3 },
  { label: '5', value: 5 },
]

function App() {
  const [deck, setDeck] = useState(null)
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(false)
  const [autoSeconds, setAutoSeconds] = useState(null)
  const [showGrid, setShowGrid] = useState(false)
  const audioRef = useRef(null)
  const indexRef = useRef(0)
  indexRef.current = index

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

  function goToIndex(newIndex) {
    indexRef.current = newIndex
    setIndex(newIndex)
    playCard(deck[newIndex])
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
    setShowGrid(false)
  }

  function handleBack() {
    goToIndex(Math.max(0, indexRef.current - 1))
  }

  function handleForward() {
    goToIndex(Math.min(deck.length - 1, indexRef.current + 1))
  }

  function handleToggleMute() {
    setMuted((m) => !m)
  }

  function handleOpenGrid() {
    audioRef.current?.pause()
    setShowGrid(true)
  }

  function handleCloseGrid() {
    setShowGrid(false)
  }

  useEffect(() => {
    if (!started || autoSeconds === null || showGrid) return undefined
    if (index >= deck.length - 1) return undefined

    const timer = setTimeout(() => {
      goToIndex(index + 1)
    }, autoSeconds * 1000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, autoSeconds, index, deck, showGrid])

  return (
    <div className={`screen${started ? ' screen--game' : ''}`}>
      <audio ref={audioRef} muted={muted} preload="none" />

      <button
        type="button"
        className="mute-button"
        onClick={handleToggleMute}
        aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
        title={muted ? 'Activar sonido' : 'Silenciar sonido'}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M4 9v6h4l5 5V4L8 9H4z" fill="#fff" />
          {muted ? (
            <path
              d="M15 9l5 5M20 9l-5 5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>
      </button>

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

      <div className="auto-controls">
        <span className="auto-label">Auto</span>
        <div className="auto-options">
          {AUTO_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className={`auto-option${autoSeconds === opt.value ? ' active' : ''}`}
              onClick={() => setAutoSeconds(opt.value)}
              aria-pressed={autoSeconds === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

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

      {started && (
        <button
          type="button"
          className="grid-button"
          onClick={handleOpenGrid}
          aria-label="Ver cartas jugadas"
          title="Ver cartas jugadas"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="17" y="1" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="17" y="9" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="1" y="17" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="9" y="17" width="6" height="6" rx="1.5" fill="#fff" />
            <rect x="17" y="17" width="6" height="6" rx="1.5" fill="#fff" />
          </svg>
        </button>
      )}

      {started && showGrid && (
        <div className="grid-modal-backdrop" onClick={handleCloseGrid}>
          <div className="grid-modal" onClick={(e) => e.stopPropagation()}>
            <div className="grid-modal-header">
              <span>Cartas jugadas ({index + 1})</span>
              <button
                type="button"
                className="grid-modal-close"
                onClick={handleCloseGrid}
                aria-label="Cerrar"
              >
                &#10005;
              </button>
            </div>
            <div className="grid-modal-body">
              <div className="played-grid">
                {deck.slice(0, index + 1).map((card) => (
                  <img
                    key={card.id}
                    src={card.src}
                    alt={card.label}
                    className="played-grid-item"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
