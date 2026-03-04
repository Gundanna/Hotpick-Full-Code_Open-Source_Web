'use strict';

class FlaruApp {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initInputLabel(); 
            this.applyEfiweAttributes();
        });
    }

    applyEfiweAttributes() {
            // const scale = 0.4;
            // document.querySelectorAll('.efiwe').forEach(el => {
            //     // Get custom attributes and scale where needed
            //     if (el.hasAttribute('wid')) {
            //         el.style.width = (parseFloat(el.getAttribute('wid'))) + 'px';
            //     }
            //     if (el.hasAttribute('color')) {
            //         el.style.color = el.getAttribute('color');
            //     }
            //     if (el.hasAttribute('bGcolor')) {
            //         el.style.backgroundColor = el.getAttribute('bGcolor');
            //     }
            //     if (el.hasAttribute('ftsize')) {
            //         el.style.fontSize = (parseFloat(el.getAttribute('ftsize'))) + 'px';
            //     }
            //     if (el.hasAttribute('tp')) {
            //         el.style.top = (parseFloat(el.getAttribute('tp'))) + '%';
            //     }
            //     if (el.hasAttribute('lef')) {
            //         el.style.left = (parseFloat(el.getAttribute('lef'))) + '%';
            //     }
            //     if (el.hasAttribute('hei')) {
            //         el.style.height = el.getAttribute('hei'); // 'auto' remains unchanged
            //     }
            //     el.style.position = 'absolute';
            //     el.style.transform = 'scale(0.8)';
            // });
    }

    initInputLabel() {
        console.log('hi')
        const startButton = document.querySelectorAll('.kdsjfwej23oiejioej32oijeoir');
        startButton.forEach(btn =>{btn.addEventListener('click', () => {
            console.log('yyoooo')
            document.querySelector('.authentication-div').style.display = 'none';
            document.querySelector('.oifgoj').style.display = 'none';
        });})
    }
}

const app = new FlaruApp();


let currentState = false;

const firebaseConfig = {
  apiKey: "AIzaSyCN6FZuI4CXIdV1F-PrAD6sAL-eTWwLPbM",
  authDomain: "flaru-421c5.firebaseapp.com",
  projectId: "flaru-421c5",
  storageBucket: "flaru-421c5.firebasestorage.app",
  messagingSenderId: "154854064616",
  appId: "1:154854064616:web:66a33c79a901f7e156645d",
  measurementId: "G-L9S3Y0X5QS"
};

const fireapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
const db = fireapp.firestore();
const storage = firebase.storage();

function createNewUser(email, password) {
    currentState = true;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.querySelectorAll('.authentication-div').forEach(div => {div.classList.add('hide') 
            console.log('hi')})
            document.querySelector('.oifgoj').classList.add('hide')
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

let userInfoUID = null;

function signIn(email, password){
    currentState = true;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        userInfoUID = user.uid;
        localStorage.setItem("uid", user.uid);
        document.querySelector('.authentication-div').classList.add('hide')
        document.querySelector('.oifgoj').classList.add('hide')
    })
    .catch((error) => {
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.dj3imcsdv4');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.querySelector('.cj5cjayz').value;
            const password = document.querySelector('.godhfugnblessamerica2').value;
            
            createNewUser(email, password);
            signIn(email, password);
        });
    }
})

document.querySelector('.kjdsfkjdsf-1').addEventListener('click', function() {
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.add('hide')
})

document.querySelector('.kjdsfkjdsf-2').addEventListener('click', function() {
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.add('hide')
})

document.querySelector('.kjdsfkjdsf').addEventListener('click', function() {
    document.querySelector('.bbnjn4mskmdfacebookfdf2').classList.remove('hide')
    document.querySelector('.bbnjn4mskmdfacebookfdf').classList.add('hide')
    document.querySelector('.oifgoj').classList.remove('hide')
})

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.bbc');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('.fjvjncjxsnap').value;
            const password = document.querySelector('.googol').value;
        
            signIn(email, password);
        });
    } 
});