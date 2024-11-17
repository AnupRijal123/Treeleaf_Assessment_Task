import '../styles/MessageScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MessageScreen() {
    const [messageTextAreaDom, setMessageTextAreaDom] = useState('');
    const [chats, setChats] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState({});
    const [apiUrl, setApiUrl] = useState('https://gorest.co.in/public/v1/users');
    // console.log(chats);
    // console.log(paginationLinks);
    console.log(apiUrl);

    useEffect(() => {
        const textAreaDom = document.getElementById('message-textarea');
        setMessageTextAreaDom(textAreaDom);

        //api call
        console.log('mounted');
        axios.get(apiUrl).then((response) => {
            // console.log(response.data)
            // console.log(response.data.meta.pagination.links);
            setChats(response.data.data);
            setPaginationLinks(response.data.meta.pagination.links);

        }).catch((error) => {
            console.log(error)
        });

    }, [apiUrl]);

    const handleInputChange = () => {
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
                    {chats.map((item) => (
                        <p key={item.id}>{item.name}</p>
                    ))}

                    <h4>previous:{paginationLinks.previous}</h4>
                    <h4>current :{paginationLinks.current}</h4>
                    <h4>next:{paginationLinks.next}</h4>

                    <button onClick={() => {
                        console.log('previous clicked');
                        if (paginationLinks.previous !== null) {
                            setApiUrl(paginationLinks.previous);
                        }
                    }}>PREVIOUS</button>
                    <button onClick={() => {
                        console.log('next clicked');
                        setApiUrl(paginationLinks.next);


                    }}>NEXT</button>

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