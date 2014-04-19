Egghead
=======

Easter Egghunt Scoreboard Server Built with NodeJS, Express, and Socket.io

### Installation
To install, clone the repo and run ```npm install``` to install the deps.

Start the server with ``` npm start ```

### Usage
Post JSON of the form ```{score: 10000 , name: 'zach' }``` to the endpoint ```/submitScore```. All connected clients will update with the new score. Perfect for hackathons, gamefests, or whatever :)
