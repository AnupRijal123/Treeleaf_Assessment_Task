import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

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
          <div className="chat-list-heading">
            <h4 className="chat-heading-text">Chats</h4>
            <p className="chat-heading-icon">A</p>
          </div>

          <div className="chat-row">
            <img className="chat-list-user-image"
              src={require('./assets/profileImage1.jpg')}
              alt="chat-user-photo"
            />
            <div className="username-and-message-container">
              <h5 className="username-text">ram_1991</h5>
              <div className="chat-preview-message">
                <p className="chat-preview-message-text">You sent a post asdasdasdasdasdasdasdadasd</p>
                <div className="chat-preview-time-container">
                  <div className="dot-container">
                    <p className="dot">.</p>
                  </div>
                  <p className="message-sent-time-text">3m</p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="right-content-container">b</div>
      </div>
    </div>
  )
}

export default App;