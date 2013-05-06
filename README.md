Enigma
======

A Web App Implementation of the German M3 Enigma Machine and Chat Server. Try it
out here: <http://xbolo.org:9000>.

Requirements
------------

*	A *nixish Operating System

	Enigma has been tested on Mac OS 10.8.3 and GNU/Linux.  The build tools are
	in active development and may not support your operating system. Your milage
	may vary.

*	Node.js >= 0.8.x

	Node is used for the running hosting the backend and and command line
	build utilities.

*	Ruby Gems

	Sass and Compass is used to build Enigma's CSS files. Mac OS X has this
	pre-installed.

Download Source and Install Dependencies
----------------------------------------

From the location you wish to install Enigma, run the following in the command
line:

	sudo npm install -g yo grunt-cli bower
	sudo gem install compass
	git clone https://github.com/zirman/enigma.git
	cd enigma
	sudo npm install
	sudo bower install

Run Commands
------------

Runs Enigma in a development environment with live reload:

	grunt server

Runs Enigma in a distribution environment with concatinated and minified source:

	grunt server:dist

Note that to properly authenticate users logging in with persona.org you will
need to set the server url at the top of chat-server.js to match the url that
users will be using to connect to your server.  For example:

	var serverUrl = 'http://mychat.org:1234';

Unit Tests
----------

Unit tests are located here:

	test/index.html
	test/model.html
	test/controller.html

Linting
-------

Run the following:

	grunt jshint

Happy Hacking!
