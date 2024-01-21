import { db, auth, app } from '../../firebase'; // Adjust the path as necessary
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = db.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });

    const [formValue, setFormValue] = useState("");

    const sendMessage = async(e) => {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: db.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref = {dummy}></div>
            </main>
            <form onSubmit = {sendMessage}>
                <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)} placeholder='text'/>
                <button type = "submit">Send</button>
            </form>
        </>
    )
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className = {`message ${messageClass}`}>
            <img src = {photoURL}/>
            <p>{text}</p>
        </div>

    )
}
export const ChatPage = () => {
    // Here you can use db and auth as needed
    // const [user] = useAuthState(auth);

    return (
        <div>
            <div>Chat Page</div>
            <header></header>
            <section>{ChatRoom}</section>
        </div>
    );
}

