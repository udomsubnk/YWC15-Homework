import React, { Component } from 'react';
import * as firebase from 'firebase';
import $ from 'jquery';

class Board extends Component {
	postsData = [];
	componentDidMount(){
		let posts = [];
		firebase.database().ref('posts/').on('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				posts.push(childSnapshot.val());
			});
			this.postsData = posts;
			this.forceUpdate();
		});
	}
	constructor(props) {
		super(props);
		firebase.initializeApp(this.config);

		this.state = {
			userPosts : []
		}
    this.push = this.push.bind(this);
	}
	config = {
	  apiKey: "AIzaSyCe1Ob0ZCwBlZF2BFMceRWnxIimL511NJE",
	  authDomain: "ywchomework-95d78.firebaseapp.com",
	  databaseURL: "https://ywchomework-95d78.firebaseio.com",
	  projectId: "ywchomework-95d78",
	  storageBucket: "",
	  messagingSenderId: "985406016798"
	};
	push = function(){
		firebase.database().ref('posts/').push({
	    name: $('input[name="name"]').val(),
	    content: $('input[name="content"]').val()
		});
	}
  render() {
    return (
			<div className="Board">
				<input type="text" name="name"/>
				<input type="text" name="content"/>
				<button onClick={ this.push }></button>
			</div>
    );
  }
}

export default Board;
