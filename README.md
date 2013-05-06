Enigma
======

A Web App Implementation of the German M3 Enigma Machine and Chat Server.

Requirements
------------

*	A *nixish Operating System

	Enigma has been tested on Mac OS 10.8.3 and GNU/Linux.  The build tools are
	in active development and may not support your operating system. Your milage
	may vary.

*	Node.js

	Node is used for the hosting the backend and and command line utilities to
	compile Enigma.

*	Ruby Gems

	Node is used for the hosting the backend and and command line utilities to
	compile Enigma.  Mac OS X has this pre-installed.

Download Source and Install Dependancies
----------------------------------------

From the location you wish to install Enigma, type the following in the command
line:

	git clone https://github.com/zirman/enigma.git
	cd enigma
	sudo npm install
	sudo gem install compass
	sudo bower install

Run Commands
------------

Runs Enigma in a development environment with live reload:

	grunt server

Runs Enigma in a distribution environment with concatinated and minified source:

	grunt server:dist

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
