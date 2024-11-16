import '../styles/ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ChatList() {
    return (
        <>
            <div className="chat-list-heading">
                <h4 className="chat-heading-text">Chats</h4>
                <FontAwesomeIcon className="chat-heading-icon custom-icon" icon="fa-solid fa-pen-to-square" />

            </div>




            <div className="chat-row">
                <img className="chat-list-user-image"
                    src={require('../assets/profileImage1.jpg')}
                    alt="chat-user-photo"
                />
                <div className="username-and-message-container">
                    <h5 className="username-text">tom_1991</h5>
                    <div className="chat-preview-message">
                        <p className="chat-preview-message-text">You sent a post</p>
                        <div className="chat-preview-time-container">
                            <div className="dot-container">
                                <p className="dot">.</p>
                            </div>
                            <p className="message-sent-time-text">3m</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-row active-chat-row">
                <img className="chat-list-user-image"
                    src={require('../assets/profileImage2.jpg')}
                    alt="chat-user-photo"
                />
                <div className="username-and-message-container">
                    <h5 className="username-text">cr7__</h5>
                    <div className="chat-preview-message">
                        <p className="chat-preview-message-text">k gardai ho?</p>
                        <div className="chat-preview-time-container">
                            <div className="dot-container">
                                <p className="dot">.</p>
                            </div>
                            <p className="message-sent-time-text">2h</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-row">
                <img className="chat-list-user-image"
                    src={require('../assets/profileImage3.jpg')}
                    alt="chat-user-photo"
                />
                <div className="username-and-message-container">
                    <h5 className="username-text">peterparker2002</h5>
                    <div className="chat-preview-message">
                        <p className="chat-preview-message-text">ma aja vyaudina voli vetaula hai mero aja bahira jane kaam cha tesaile</p>
                        <div className="chat-preview-time-container">
                            <div className="dot-container">
                                <p className="dot">.</p>
                            </div>
                            <p className="message-sent-time-text">4d</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ChatList;