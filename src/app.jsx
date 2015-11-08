var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    addTweet: function(tweet) {
      var tweets = this.state.data;
      var newTweets = tweets.concat([tweet]);

      if(newTweets.length > 5) {
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
          console.log(data.tweet);
          this.addTweet(data.tweet);
      }.bind(this));
    },
    render: function() {
      return <div className="panel-group">
            {this.renderTweets()}
        </div>  
    },
    renderTweets: function(){
      return this.state.data.map(function(tweet){
        return <div className="panel panel-default" key={tweet.id}> 
          <div className="panel-heading">
            <img src={tweet.user.profile_image_url} />
            <a href={"http://www.twitter.com/" + tweet.user.screen_name}>{tweet.user.name}</a> 
            @{tweet.user.screen_name}
          </div>
          <div className="panel-body">
            {tweet.text}
          </div>
        </div>
      })
    }
});

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);