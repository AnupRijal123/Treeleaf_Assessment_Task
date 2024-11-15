import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import ChatList from './components/ChatList.js';

library.add(fas, far);


function App() {
  return (
    <div className="main-container">
      <div className="navbar">
        <div className="navbar-heading">
          <h4>Treeleaf Assessment Task</h4>
          <small className="developer-name"> by Anup Rijal</small>
        </div>
        <div className="icons-container">
          <FontAwesomeIcon icon={['fas', 'house']} />
          <FontAwesomeIcon icon={['far', 'house']} />

          <div>msg</div>

          <div>profile</div>
          <img className="profile-image"
            src={require('./assets/profileImage1.jpg')}
            alt="profile-photo"
          />
        </div>
      </div>
      <div className="content-container">
        <div className="left-content-container">
          <ChatList />


        </div>

        <div className="right-content-container">b</div>
      </div>
    </div>
  )
}

export default App;