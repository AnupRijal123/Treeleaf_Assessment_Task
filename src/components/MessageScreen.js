import '../styles/MessageScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

function MessageScreen() {
    const [messageTextAreaDom, setMessageTextAreaDom] = useState('');

    useEffect(() => {
        const textAreaDom = document.getElementById('message-textarea');
        setMessageTextAreaDom(textAreaDom)
    }, []);

    const handleInputChange = () => {
        console.log('helloo')
        console.log(messageTextAreaDom);
        messageTextAreaDom.style.height = 'auto';
        messageTextAreaDom.style.height = `${messageTextAreaDom.scrollHeight}px`;

    }
    return (
        <>
            <div className="top-section">
                <div className="message-screen-heading">
                    <div className="user-info-container">
                        <img className="profile-image"
                            src={require('../assets/profileImage2.jpg')}
                            alt="chat-profile-image"
                        />
                        <h4>cr7__</h4>
                    </div>
                    <div className="call-and-video-icons-div">
                        <p title="Audio Call"><FontAwesomeIcon className="custom-icon" icon="fa-solid fa-phone" /></p>
                        <p title="Video Call"><FontAwesomeIcon className="custom-icon" icon="fa-solid fa-video" /></p>
                    </div>
                </div>
                <div className="chats-screen-container">
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>
                    <h4>hello</h4>

                </div>
            </div>
            <div className="bottom-section">
                <div className="message-icons-container">
                    <FontAwesomeIcon className="custom-icon" icon="fa-solid fa-microphone" />
                    <FontAwesomeIcon className="custom-icon" icon="fa-regular fa-image" />
                </div>
                <div className="message-input-container">
                    <textarea
                        id="message-textarea"
                        onInput={handleInputChange}
                        placeholder="Message..."
                    />
                    <button className="send-button">Send</button>
                </div>
            </div>
        </>
    )
}

export default MessageScreen;