import '../styles/MessageScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUrl } from '../redux/action.js';

function MessageScreen() {
    const [messageTextAreaDom, setMessageTextAreaDom] = useState('');
    const [chatsArray, setChatsArray] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState({});
    // const [apiUrl, setApiUrl] = useState('https://gorest.co.in/public/v1/users');
    // console.log(chats);
    // console.log(paginationLinks);
    // console.log(apiUrl);

    //getting api url from redux store
    let apiURL = useSelector((state) => {
        return state.apiUrl;
    });
    console.log(apiURL);

    console.log(paginationLinks);
    const changeUrl = useDispatch();


    useEffect(() => {
        console.log('api changed');
        axios.get(apiURL).then((response) => {
            setChatsArray(response.data.data);
            setPaginationLinks(response.data.meta.pagination.links);
        }).catch((error) => {
            console.log(error);
        });
    }, [apiURL]);

    useEffect(() => {
        const textAreaDom = document.getElementById('message-textarea');
        setMessageTextAreaDom(textAreaDom);
    }, []);

    const changePage = function (pageName) {
        console.log(pageName);
        if (pageName === 'go-to-previous-page') {
            console.log('previous clicked');
            if (paginationLinks.previous !== null) {
                changeUrl(getUrl(paginationLinks.previous)); //redux ma new url dispatch gareko
            }
        }
        if (pageName === 'go-to-next-page') {
            console.log('next clicked');
            if (paginationLinks.next !== null) {
                changeUrl(getUrl(paginationLinks.next)); //redux ma new url dispatch gareko
            }
        }
    }
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
                    {chatsArray.map((item) => (
                        <p key={item.id}>{item.name}</p>
                    ))}

                    <h4>previous:{paginationLinks.previous}</h4>
                    <h4>current :{paginationLinks.current}</h4>
                    <h4>next:{paginationLinks.next}</h4>
                    {/* 
                    <button onClick={() => {
                        console.log('previous clicked');
                        if (paginationLinks.previous !== null) {
                            setApiUrl(paginationLinks.previous);
                        }
                    }}>PREVIOUS</button>
                    <button onClick={() => {
                        console.log('next clicked');
                        setApiUrl(paginationLinks.next);


                    }}>NEXT</button> */}

                    <button onClick={() => changePage('go-to-previous-page')}>PREVIOUS</button>
                    <button onClick={() => changePage('go-to-next-page')}>NEXT</button>

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