import '../styles/ChatList.css';
function ChatList() {
    return (
        <>
            <div className="chat-list-heading">
                <h4 className="chat-heading-text">Chats</h4>
                <p className="chat-heading-icon">A</p>
            </div>

            <div className="chat-row">
                <img className="chat-list-user-image"
                    src={require('../assets/profileImage1.jpg')}
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
        </>
    )
}

export default ChatList;