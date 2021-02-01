import { useEffect, useState } from "react"

const TabList = ({reactionsDict, contentReactionsDict, selectedReaction, setSelectedReaction}) => {
  return (
    <ul className='tab-list'>
      <li className={selectedReaction === 'all' ? 'active' : ''} onClick={() => setSelectedReaction('all')}>All</li>
      {Object.entries(contentReactionsDict).map(([reactionId, reactions]) => {
          console.log('selectedReaction === reactionId >', selectedReaction === reactionId)
          return (
            <li className={selectedReaction === reactionId ? 'active' : ''} key={reactionId} onClick={() => setSelectedReaction(reactionId)}>
              <span className='emoji emoji-tab'>{reactionsDict[reactionId].emoji}</span>
              <span className='count'>{reactions.length}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

const ScrollList = ({details, usersDict, reactionsDict}) => {
  return (
    <ul className='scroll-list'>
      {details.map(detail => {
        const user = usersDict[detail.user_id]
        return (
          <li key={detail.id}>
            <img className='round' src={user.avatar} />
            <span className='emoji'>{reactionsDict[detail.reaction_id].emoji}</span>
            <span>{user.first_name} {user.last_name}</span>
          </li>
        )
      })}
    </ul>
  )
}

export const Summary = ({usersDict, reactionsDict, contentReactionsDict, selectedReaction}) => {
  const [_selectedReaction, setSelectedReaction] = useState(selectedReaction)
  useEffect(() => {
    setSelectedReaction(selectedReaction)
  }, [selectedReaction])
  
  let details = _selectedReaction !== 'all' ? 
    (contentReactionsDict[_selectedReaction] || []) :
    Object.entries(contentReactionsDict).reduce((result, [reactionId, reactions]) => {
      return result.concat(...reactions)
    }, [])

  return (
    <div id='summary'>
      <h3>Reactions</h3>
      <TabList reactionsDict={reactionsDict} contentReactionsDict={contentReactionsDict} 
        selectedReaction={_selectedReaction} setSelectedReaction={setSelectedReaction} />

      <ScrollList details={details} usersDict={usersDict} reactionsDict={reactionsDict} />
    </div>
    )
  }