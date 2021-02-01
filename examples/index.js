import React from 'react';
import ReactDOM from 'react-dom';

import Reactions from '../src/index';
import 'reset-css';
import './page.scss'

const baseUrl = 'https://artful-iudex.herokuapp.com'
const request = (url, opts) => fetch(baseUrl + url, opts).then(res => res.json())

const getContentReactions = contentId => request(`/user_content_reactions?content_id=${contentId}`)

const getReactions = () => request('/reactions')

const getUsers = () => request('/users')

const addReaction = ({user_id, content_id, reaction_id}) =>
  request(`/user_content_reactions`, {
    method: 'POST',
    body: JSON.stringify({user_id, content_id, reaction_id})
  })

const deleteReaction = (reaction_id) =>
  request(`/user_content_reactions/${reaction_id}`, {
    method: 'DELETE'
  })

const articles = [{
  id: 1,
  title: 'Article One',
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in elit non mi pulvinar viverra in id mi. Nulla non vestibulum turpis. Proin ac cursus sem. Duis sodales massa nec dignissim eleifend. Proin ut eros consectetur, faucibus odio vestibulum, volutpat mi. Sed scelerisque sit amet magna a consequat. Curabitur fringilla vel nibh quis molestie. Aenean congue nisi quis justo euismod luctus. Vivamus gravida erat in eros pulvinar, at viverra massa pretium. In hendrerit mauris est, non imperdiet ante venenatis eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla interdum ligula id ante eleifend dictum. Morbi eu consectetur arcu, quis vehicula urna.`
}, {
  id: 2,
  title: 'Article Two',
  content: `Maecenas in turpis fringilla, mollis justo fringilla, hendrerit purus. Cras quis sem eu magna porttitor lacinia. Curabitur ac interdum elit. Aliquam lacinia augue sit amet quam varius, eu gravida ipsum tincidunt. Nam et magna ac eros gravida ullamcorper nec non velit. Aenean volutpat metus maximus, efficitur metus molestie, rutrum sem. Suspendisse nec aliquam mi.
    Etiam tempor diam eu suscipit egestas. Maecenas ut libero a magna faucibus ultricies tristique commodo erat. In vel mattis sapien. Mauris tellus nisi, cursus vitae dictum quis, cursus eget tellus. Morbi eu leo eget dolor iaculis vulputate. Donec cursus, ex ut luctus aliquam, nisl sem fermentum dolor, at feugiat nisl purus a lectus. Aliquam erat volutpat. Maecenas eu quam maximus, auctor nulla a, egestas libero. Nullam vel euismod velit. Morbi ut erat at odio ultricies euismod dapibus sit amet tellus. Quisque dapibus nunc lectus, id vehicula erat ornare vel.`
}]

ReactDOM.render(
  <React.StrictMode>
    <header className='text-center'>
      <h1>Let's React &#128077;</h1>
    </header>
    {articles.map(({id, title, content}) => (
      <article key={id}>
        <header>
          <h1>{title}</h1>
          <Reactions
            currentUserId={4}
            contentId={id}
            getReactions={getReactions}
            getContentReactions={getContentReactions}
            getUsers={getUsers}
            addReaction={addReaction}
            deleteReaction={deleteReaction}
          />
        </header>
        <p className='content'>{content}</p>
      </article>
    ))}
  </React.StrictMode>,
  document.getElementById('root')
);
