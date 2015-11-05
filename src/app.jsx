var React = require('react');

var App = React.createClass({
    addTweet: function(tweet) {
      var tweets = this.state.data;
      var newTweets = tweets.concat([tweet]);

      if(newTweets.length > 20) {
          newTweets.splice(0, 1);
      }

      this.setState({data: newTweets});
    },
    getInitialState: function() {
      return {data: []};
    },
    componentWillMount: function() {
      var socket = io.connect();
  
      socket.on('info', function (data) {
          this.addTweet(data.tweet);
      }.bind(this));
    },
    render: function() {
      return <div>
          <ul>
            {this.renderTweets()}
          </ul>
        </div>  
    },
    renderTweets: function(){
      return this.state.data.map(function(tweet){
        return <li key={tweet.id}> {tweet.text}</li>
      })
    }
});

React.render(
  <App />,
  document.querySelector('.container')
);