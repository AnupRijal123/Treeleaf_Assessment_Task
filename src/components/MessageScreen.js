import '../styles/MessageScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUrl } from '../redux/action.js';

function MessageScreen() {
    const [messageTextAreaDom, setMessageTextAreaDom] = useState('');
    const [paginationLinks, setPaginationLinks] = useState({});
    const [allChatsArray, setAllChatsArray] = useState([]);
    const [message, setMessage] = useState('hello');

    console.log(allChatsArray);
    //getting api url from redux store
    let apiURL = useSelector((state) => {
        return state.apiUrl;
    });
    // console.log(apiURL);

    // console.log(paginationLinks);
    const changeUrl = useDispatch();


    useEffect(() => {
        axios.get(apiURL).then((response) => {
            // console.log('response', response.data.data);
            setPaginationLinks(response.data.meta.pagination.links);

            /* here i want to check if allChatsArray has object that
             is also present in response.data.data array,if no object
             in response matches in allChatsArray i.e it will return 
             undedined then only reponse array
             objects are pushed or prepend in allChatsArray
            
            // const matchingUser = allChatsArray.find((item) => {
            //     return item.id === response.data.data[0].id
            // });
            // console.log(matchingUser);
            // if (matchingUser === undefined) {
            //     setAllChatsArray([...response.data.data, ...allChatsArray]);
            // }

            this code is written is same as below code this code 
            gave warning so i wrote below code 
            */

            setAllChatsArray((previousAllChatArray) => {
                //only proceed when previoiusAllChatArray is not empty
                if (previousAllChatArray) {
                    const matchingUser = previousAllChatArray.find((item) => {
                        return item.id === response.data.data[0].id
                    });
                    //if no matching user is found 
                    if (matchingUser === undefined) {
                        return [...response.data.data, ...previousAllChatArray]
                    }
                    return previousAllChatArray;
                }
            });

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
    const sendMessage = function () {
        console.log('send clicked');

        console.log('length', allChatsArray.length);
        const lastElementOfArray = allChatsArray[allChatsArray.length - 1];
        console.log(lastElementOfArray);
        const lastIndex = allChatsArray.indexOf(lastElementOfArray);
        console.log(lastIndex);
        /* if last index is odd next message will 
            be stored at even index so inserting empty 
            object and then inserting new message
        */
        const newMessageObject = {
            id: Math.random() * 123456789,
            name: message
        };
        if (lastIndex % 2 !== 0) {
            console.log(...allChatsArray.slice(0));
            setAllChatsArray([...allChatsArray.slice(0), {}, newMessageObject])

        } else {
            setAllChatsArray([...allChatsArray, newMessageObject]);
        }
        setMessage('');
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
                    {allChatsArray.map((item, index) => (
                        <div key={item.id} className={index % 2 === 0 ? 'message-chat-row left-align-message' : 'message-chat-row right-align-message'}>
                            {Object.keys(item).length !== 0 &&
                                <p className="message-text">{item.name} {item.email} {item.gender}</p>
                            }
                        </div>
                    ))}



                </div>
            </div>
            <div className="bottom-section">
                <div className="message-icons-container">
                    <FontAwesomeIcon className="custom-icon" icon="fa-solid fa-microphone" />
                    <FontAwesomeIcon className="custom-icon" icon="fa-regular fa-image" />
                </div>
                <div className="message-input-container">
                    {message}
                    <textarea
                        id="message-textarea"
                        onInput={handleInputChange}
                        placeholder="Message..."
                        value={message}
                        onChange={(event) => {
                            console.log(event.target.value)
                            setMessage(event.target.value)
                        }}
                    />
                    {message !== '' &&
                        <div onClick={sendMessage} className="send-arrow-icon-container" title="Send Message">
                            <FontAwesomeIcon className="send-arrow-icon" icon="fa-solid fa-arrow-up" />
                        </div>
                    }



                </div>
            </div>
            <div>
                <h4>previous:{paginationLinks.previous}</h4>
                <h4>current :{paginationLinks.current}</h4>
                <h4>next:{paginationLinks.next}</h4>


                <button onClick={() => changePage('go-to-previous-page')}>PREVIOUS</button>
                <button onClick={() => changePage('go-to-next-page')}>NEXT</button>
            </div>
        </>
    )
}

export default MessageScreen;