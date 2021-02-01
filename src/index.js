import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { AddReactions } from './components/AddReactions';
import { ContentReactions } from './components/ContentReactions';
import { Summary } from './components/Summary'

import './styles/index.scss'

export default function Reactions({currentUserId, contentId, getUsers, getReactions, getContentReactions, addReaction, deleteReaction}) {
  const [usersDict, setUserDict] = useState(null)
  const [reactionsDict, setReactionsDict] = useState(null)
  const [contentReactionsDict, setContentReactionsDict] = useState(null)
  const [disabledReactions, setDisabledReactions] = useState([])
  const [focusedReaction, setFocusedReaction] = useState(null)

  const onEmojiHover = reactionId => {
    setFocusedReaction(reactionId)
  }

  const onUserReact = reactionId => {
    const reaction = getUserReaction(reactionId)
    setDisabledReactions(disabledReactions => [...disabledReactions, reactionId])
    
    let request = reaction ?
      deleteReaction(reaction.id).then(() => postDeletion(reactionId)) :
      addReaction(currentUserId, contentId, reactionId).then(({id}) => postAddition(reactionId, id))

    request.finally(() => {
      setDisabledReactions(disabledReactions => [...disabledReactions.filter(id => id !== reactionId)])
    })
  }

  const postDeletion = reactionId => {
    let contentReactions = contentReactionsDict[reactionId]
    contentReactions = contentReactions.filter(reaction => reaction.user_id !== currentUserId)
    if (contentReactions.length > 0) {
      contentReactionsDict[reactionId] = [...contentReactions]
    } else {
      delete contentReactionsDict[reactionId]
    }
    setContentReactionsDict({...contentReactionsDict})
  }

  const postAddition = (reactionId, id) => {
    const contentReactions = contentReactionsDict[reactionId] || []
    contentReactionsDict[reactionId] = [...contentReactions, {
      id,
      user_id: currentUserId,
      reaction_id: reactionId,
      content_id: contentId
    }]
    setContentReactionsDict({...contentReactionsDict})
  }

  const getUserReaction = reactionId => {
    const reactions = contentReactionsDict[reactionId]
    if (reactions) {
      for(let index = 0; index < reactions.length; index++) {
        const reaction = reactions[index]
        if (reaction.user_id === currentUserId) {
          return reaction
        }
      }
    }
    return null
  }

  useEffect(() => {
    const groupByReactions = data => {
      let obj = {}
      data.forEach(reaction => {
        const arr = obj[reaction.reaction_id]
        if (arr) {
          obj[reaction.reaction_id] = [...arr, reaction]
        } else {
          obj[reaction.reaction_id] = [reaction]
        }
      })
      return obj
    }

    getContentReactions(contentId).then(_reactions => {
      setContentReactionsDict({...groupByReactions(_reactions)})
    })
  }, [getContentReactions])

  useEffect(() => {
    getUsers().then(users => {
      let obj = {}
      users.forEach(user => {
        obj[user.id] = user
      })
      setUserDict(obj)
    })
  }, [getUsers])

  useEffect(() => {
    getReactions().then(reactions => {
      let obj = {}
      reactions.forEach(reaction => {
        obj[reaction.id] = reaction
      })
      setReactionsDict(obj)
    })
  }, [getReactions])

  return (
    <div className='flex pos-relative align-unset' onMouseLeave={() => setFocusedReaction(null)}>
      {focusedReaction && <Summary selectedReaction={focusedReaction} usersDict={usersDict} reactionsDict={reactionsDict} contentReactionsDict={contentReactionsDict} />}
      <ContentReactions onEmojiHover={onEmojiHover} disabledReactions={disabledReactions} currentUserId={currentUserId} onUserReact={onUserReact} contentReactionsDict={contentReactionsDict} reactionsDict={reactionsDict} />
      <AddReactions disabledReactions={disabledReactions} onUserReact={onUserReact} reactionsDict={reactionsDict} />
    </div>
  );
}

Reactions.propTypes = {
  currentUserId: PropTypes.number,
  contentId: PropTypes.number,
  getReactions: PropTypes.func,
  getContentReactions: PropTypes.func,
  getUsers: PropTypes.func,
  addReaction: PropTypes.func,
  deleteReaction: PropTypes.func
}