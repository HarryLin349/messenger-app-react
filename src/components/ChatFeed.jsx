import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import LogoutButton from './LogoutButton';

const ChatFeed = (props) => {

    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];
    // if chats exists, then set it as chats[activeChat]

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key = {`read_${index}`}
                className = "read-receipt"
                style={{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})` 
                }}
            />
        ))

    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {isMyMessage
                        ? <MyMessage message={message}/>
                        : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>}
                    </div>
                    <div className="read-receipts" style={{
                        marginRight: isMyMessage ? '18px' : '0px',
                        marginLeft: isMyMessage ? '0px' : '68px'
                    }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    renderMessages();

    if (!chat) return "Loading...";

    // console.log(chat, userName, messages);

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat?.title}
                </div>
                <div className="chat-subtitle">
                    <p>If chat isn't loading, try refreshing or switching chat rooms.</p>
                    <p>The backend takes a moment to start, so please be patient.</p>
                </div>
                {renderMessages()}
                <div style={{height: '100px'}}/>
                <div className = "message-form-container">
                    <MessageForm { ... props} chatId ={activeChat}/>
                    <LogoutButton/>

                </div>

            </div>
        </div>
    )
}

export default ChatFeed;