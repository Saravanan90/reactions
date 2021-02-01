import { useRef } from 'react'
import {CSSTransition} from 'react-transition-group';

import AddReactionLogo from '../assets/add-reaction.svg'
import { useGlobalDismiss } from './hooks/useGlobalDismiss';
import { LoaderWrapper } from './LoaderWrapper';

const EmojiList = ({disabledReactions, showList, reactionsDict, onEmojiClick}) => {
  const nodeRef = useRef(null)
  const reactions = reactionsDict && Object.entries(reactionsDict).map(([reactionId, reaction]) => {
    const isDisabled = disabledReactions.indexOf(reactionId) !== -1
    return <button disabled={isDisabled} className='emoji-container' key={reactionId} onClick={() => onEmojiClick(reactionId)}>
      <div className='tooltip'>{reaction.name}</div>
      <span className='emoji'>{reaction.emoji}</span>
    </button>
  })
  return (
    <CSSTransition unmountOnExit nodeRef={nodeRef} in={showList} timeout={200} classNames='slide-up'>
      <div ref={nodeRef} className='emoji-list'>
        <LoaderWrapper dataset={[reactionsDict]} content={reactions} />
      </div>
    </CSSTransition>
  )
}

const AddButton = ({toggleList}) => (
  <button className='btn-round' onClick={toggleList}>
    <img src={AddReactionLogo} alt='' />
  </button>
)

export const AddReactions = ({disabledReactions, reactionsDict, onUserReact}) => {
  const [showList, toggleList] = useGlobalDismiss()

  const onEmojiClick = emojiId => {
    toggleList(false)
    onUserReact(emojiId)
  }

  return (
    <div className='flex-end pos-relative' onClick={event => event.stopPropagation()}>
      <EmojiList disabledReactions={disabledReactions} showList={showList} reactionsDict={reactionsDict} onEmojiClick= {onEmojiClick} />
      <AddButton toggleList={() => toggleList(!showList)} />
    </div>
  )
}