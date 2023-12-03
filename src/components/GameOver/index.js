import './index.css'

const GameOver = props => {
  const {score, playAgain} = props

  const playNow = () => {
    playAgain()
  }

  return (
    <div className="game-over-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        className="trophy-pic"
      />
      <h1 className="your-score">YOUR SCORE</h1>
      <h1 className="score-final">{score}</h1>
      <button type="button" onClick={playNow} className="play-again-btn">
        <div className="play-again-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-img"
          />
          <h1 className="play-again-text">PLAY AGAIN</h1>
        </div>
      </button>
    </div>
  )
}

export default GameOver
