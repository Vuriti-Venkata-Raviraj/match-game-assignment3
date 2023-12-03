import {Component} from 'react'
import TemplatesTab from '../TemplatesTab'
import TemplateItems from '../TemplateItems'
import GameOver from '../GameOver'
import './index.css'

class MatchScore extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      tab: tabsList[0].tabId,
      matchNo: Math.floor(Math.random() * imagesList.length),
      score: 0,
      time: 60,
      isGameRunning: true,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.startTimer()
    }, 1000)
  }

  playAgain = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      tab: tabsList[0].tabId,
      matchNo: Math.floor(Math.random() * imagesList.length),
      score: 0,
      time: 60,
      isGameRunning: true,
    })
    this.componentDidMount()
  }

  checkTemplate = templateId => {
    const {imagesList} = this.props
    const matchId = this.selectRandomImage()
    const newNumber = Math.floor(Math.random() * imagesList.length)
    if (matchId === templateId) {
      this.setState(prev => ({matchNo: newNumber, score: prev.score + 1}))
      this.selectRandomImage()
    } else {
      clearInterval(this.timerId)
      this.setState({isGameRunning: false})
    }
  }

  renderMatchImg = () => {
    const {imagesList} = this.props
    const {matchNo} = this.state
    const {imageUrl} = imagesList[matchNo]
    return (
      <div className="match-container">
        <img src={imageUrl} alt="match" className="match-img" />
      </div>
    )
  }

  selectRandomImage = () => {
    const {matchNo} = this.state
    const {imagesList} = this.props
    const {id} = imagesList[matchNo]
    return id
  }

  changeTab = tabId => {
    this.setState({tab: tabId})
  }

  startTimer() {
    const {time} = this.state
    if (time === 0) {
      clearInterval(this.timerId)
      this.setState({isGameRunning: false})
    } else {
      this.setState(prev => ({
        time: prev.time - 1,
      }))
    }
  }

  render() {
    const {tab, score, time, isGameRunning} = this.state
    const {tabsList, imagesList} = this.props
    const modifiedImageList = imagesList.filter(
      imgItem => imgItem.category === tab,
    )

    return (
      <div className="main-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="score-container">
            <h1 className="score-and-time">
              Score: <span className="score">{score}</span>
            </h1>
            <div className="timer-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
              <h1 className="score-and-time">
                <span className="score"> {time}</span> sec
              </h1>
            </div>
          </div>
        </nav>
        <div>
          {isGameRunning ? (
            <div className="running-container">
              <div className="random-image-container">
                {this.renderMatchImg()}
              </div>
              <ul className="tab-items">
                {tabsList.map(tabItem => (
                  <TemplatesTab
                    tab={tabItem}
                    changeTab={this.changeTab}
                    key={tabItem.tabId}
                    isActive={tabItem.tabId === tab}
                  />
                ))}
              </ul>
              <ul className="template-items">
                {modifiedImageList.map(templateItem => (
                  <TemplateItems
                    key={templateItem.id}
                    checkTemplate={this.checkTemplate}
                    templateItem={templateItem}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <GameOver score={score} playAgain={this.playAgain} />
          )}
        </div>
      </div>
    )
  }
}

export default MatchScore
