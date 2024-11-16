import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ChatList from './components/ChatList.js';

library.add(fas, far, fab);


function App() {
  return (
    <div className="main-container">
      <div className="navbar">
        <div className="navbar-heading">
          <h4>Treeleaf Assessment Task</h4>
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