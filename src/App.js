import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ChatList from './components/ChatList.js';
import MessageScreen from './components/MessageScreen.js';
import { useState } from 'react';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

library.add(fas, far, fab);


function App() {
  const [selectedIcon, setSelectedIcon] = useState('message');
  const selectIcon = function (iconName) {

    setSelectedIcon(iconName);
  }
  return (
    <div className="main-container">
      <div className="navbar">
        <div className="navbar-heading">
          <h4>Chat Message Design (React+Css)</h4>
          <a href="https://anup-rijal-portfolio.web.app/">
            <p className="developer-name"> by Anup Rijal</p>
          </a>
        </div>

        <div className="github-code-container">
          <a href="https://github.com/AnupRijal123/Treeleaf_Assessment_Task/tree/development-branch">
            <p className="github-link-text">see code</p>
          </a>
          <FontAwesomeIcon className="custom-icon" icon="fa-brands fa-github" />
        </div>
        <div className="icons-container">
          <FontAwesomeIcon onClick={() => { selectIcon('home') }} className={`custom-icon ${selectedIcon === 'home' && 'active-icon'}`} icon="fa-solid fa-house" />
          <FontAwesomeIcon onClick={() => { selectIcon('message') }} className={`custom-icon ${selectedIcon === 'message' && 'active-icon'}`} icon="fa-solid fa-message" />
          <FontAwesomeIcon onClick={() => { selectIcon('like') }} className={`custom-icon ${selectedIcon === 'like' && 'active-icon'}`} icon="fa-solid fa-heart" />
          <img className="profile-image"
            src={require('./assets/profileImage1.jpg')}
            alt="profile-photo"
            title="Edit Profile"
          />
        </div>
      </div>
      <div className="content-container">
        <div className="left-content-container">
          <ChatList />
        </div>

        <div className="right-content-container">
          <Provider store={store}>
            <MessageScreen />
          </Provider>

        </div>
      </div>
    </div>
  )
}

export default App;