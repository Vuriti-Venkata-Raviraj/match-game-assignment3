import './index.css'

const TemplateItem = props => {
  const {templateItem, checkTemplate} = props
  const {id, thumbnailUrl} = templateItem

  const isAnswerCorrect = () => {
    checkTemplate(id)
  }

  return (
    <li className="template-card">
      <button type="button" className="thumbnail-btn" onClick={isAnswerCorrect}>
        <img src={thumbnailUrl} alt="thumbnail" className="template-img" />
      </button>
    </li>
  )
}

export default TemplateItem
