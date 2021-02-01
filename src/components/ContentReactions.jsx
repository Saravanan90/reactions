import { LoaderWrapper } from './LoaderWrapper';

export const ContentReactions = ({disabledReactions, currentUserId, contentReactionsDict, reactionsDict, onEmojiHover, onUserReact}) => {

  const emojiButtons = contentReactionsDict && reactionsDict && 
    Object.entries(contentReactionsDict).map(([reactionId, reactions]) => {
      const hasCurrentUserReacted = !!reactions.find(reaction => reaction.user_id === currentUserId)
      const isDisabled = disabledReactions.indexOf(reactionId) !== -1
      return (
        <button disabled={isDisabled} onClick={() => onUserReact(reactionId)} onMouseOver={() => onEmojiHover(reactionId)} key={reactionId} className={'btn-emoji ' + (hasCurrentUserReacted ? 'selected' : '')}>
          <span className='emoji'>{reactionsDict[reactionId].emoji}</span>
          <span className='count'>{reactions.length}</span>
        </button>
      )
    })

  return (
    <div className='flex min-width-50'>
      <LoaderWrapper dataset={[contentReactionsDict, reactionsDict]} content={emojiButtons} />
    </div>
  )
}