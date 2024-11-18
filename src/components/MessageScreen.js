import '../styles/MessageScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUrl } from '../redux/action.js';

function MessageScreen() {
    const [messageTextAreaDom, setMessageTextAreaDom] = useState(null);
    const [paginationLinks, setPaginationLinks] = useState({});
    const [allChatsArray, setAllChatsArray] = useState([]);
    const [message, setMessage] = useState('');
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const chatScreenRef = useRef(null);
    const [moveToBottom, setMoveToBottom] = useState(true);
    const [moveToMiddle, setMoveToMiddle] = useState(false);
    const [showButtonAnimation, setShowButtonAnimation] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const nextButtonRef = useRef();

    // console.log(allChatsArray);
    //getting api url from redux store
    let apiURL = useSelector((state) => {
        return state.apiUrl;
    });
    // console.log(apiURL);

    // console.log(paginationLinks);
    const changeUrl = useDispatch();

    function scrollToBottom() {
        setShowButton(false);
        console.log('scroll bottom');
        const chatScreenContainerDom = chatScreenRef.current;
        chatScreenContainerDom.scrollTop = chatScreenContainerDom.scrollHeight;
    }
    function scrollToMiddle() {
        console.log('scroll middle');
        const chatScreenDom = chatScreenRef.current;
        chatScreenDom.scrollTop = 600;

    }
    useEffect(() => {
        console.log('array changed');
        if (moveToBottom === true) {
            //scroll to bottom
            setMoveToMiddle(false);
            scrollToBottom();


        }
        if (moveToMiddle === true) {
            //scroll to middle
            setMoveToBottom(false);
            scrollToMiddle();
        }
    }, [allChatsArray, moveToBottom, moveToMiddle]); // moveToBottom, moveToMiddle these is not need here it gave warning so only allChatsArray is need in this dependency array


    useEffect(() => {
        axios.get(apiURL).then((response) => {
            setShowError(false);
            setShowLoading(false);

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
                        return [...response.data.data, ...previousAllChatArray];
                    }

                    return previousAllChatArray;
                }
            });






        }).catch((error) => {
            console.log(error);
            setShowLoading(false);
            setShowError(true);
        });
    }, [apiURL]);



    //checking scroll position of chatscreen
    const handleChatScreenScroll = function () {
        console.log('scrolled');
        const chatScreenDom = chatScreenRef.current;
        console.log(chatScreenDom.scrollTop);

        const nextButtonDom = nextButtonRef.current;
        console.log('next button', nextButtonDom);
        if (chatScreenDom.scrollTop === 0) {
            setShowButton(true);
            setShowButtonAnimation(true);

            setTimeout(() => {
                setShowButtonAnimation(false);
            }, 1000);

            //when chat screen is scrolled to 0 i.e top next button is clicked
            nextButtonDom.click();

        }
        if (chatScreenDom.scrollTop + chatScreenDom.clientHeight >= chatScreenDom.scrollHeight - 200) {
            setShowButton(false);
        }



    }


    useEffect(() => {

        const nextButtonDom = nextButtonRef.current;
        console.log('next button', nextButtonDom);

        const textAreaDom = document.getElementById('message-textarea');
        setMessageTextAreaDom(textAreaDom);

        const chatScreenDom = chatScreenRef.current;
        chatScreenDom.addEventListener('scroll', handleChatScreenScroll);

        return () => {
            chatScreenDom.removeEventListener('scroll', handleChatScreenScroll);
        }


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
                setShowLoading(true);
                setMoveToBottom(false);
                setMoveToMiddle(true);
            }
        }
    }
    const handleInputChange = () => {
        messageTextAreaDom.style.height = 'auto';
        messageTextAreaDom.style.height = `${messageTextAreaDom.scrollHeight}px`;
    }
    const sendMessage = function () {
        setMoveToMiddle(false);
        setMoveToBottom(true);

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

                <div className="alert-container">
                    {showLoading === true &&
                        <p className="alert-message-text">Loading messages</p>
                    }
                    {showError === true &&
                        <p className="alert-message-text error-message-text">Something went wrong.Try again</p>
                    }

                </div>
                {showButton === true &&
                    <div className={`chat-down-button-container ${showButtonAnimation === true && 'animate-button-container'}`}>
                        <div onClick={scrollToBottom} className="chat-down-icon-container">
                            <FontAwesomeIcon className="chat-down-icon" icon="fa-solid fa-angle-down" />

                        </div>
                    </div>
                }

                <div className="chats-screen-container" ref={chatScreenRef} >
                    {allChatsArray.map((item, index) => {
                        // checking if item object is not empty
                        if (Object.keys(item).length !== 0) {
                            return (
                                <div key={item.id} className={index % 2 === 0 ? 'message-chat-row left-align-message' : 'message-chat-row right-align-message'}>
                                    <p className="message-text">{item.name} {item.email} {item.gender}</p>
                                </div>
                            )
                        }
                        return item.name; //map should return something otherwise it gave warning so i wrote this return,this code is not needed
                    }







                        // <div key={item.id} className={index % 2 === 0 ? 'message-chat-row left-align-message' : 'message-chat-row right-align-message'}>
                        //     {Object.keys(item).length !== 0 &&
                        //         <p className="message-text">{item.name} {item.email} {item.gender}</p>
                        //     }
                        // </div>

                    )}



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

                <button onClick={() => changePage('go-to-previous-page')} className="previous-button">PREVIOUS</button>
                <button ref={nextButtonRef} onClick={() => changePage('go-to-next-page')} className="next-button">NEXT</button>
            </div>
        </>
    )
}

export default MessageScreen;