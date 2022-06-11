// Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRJBaWfOn6l9KqX5nSd3YSxgigh7usWhc",
    authDomain: "chat-app-c1748.firebaseapp.com",
    databaseURL: "https://chat-app-c1748-default-rtdb.firebaseio.com",
    projectId: "chat-app-c1748",
    storageBucket: "chat-app-c1748.appspot.com",
    messagingSenderId: "694787091655",
    appId: "1:694787091655:web:8ea1e79b4d5fdddce262e2"
};

firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
        username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});