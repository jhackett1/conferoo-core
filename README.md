Conferoo-API
============

This is an (incomplete) Express application intended for paperless conferences.

It is the central piece of software in a Conferoo platform, serving an API intended for consumption by separate client apps.

API
===

Conferoo exposes a RESTful API with the following endpoints:

* `GET /events` shows a list of all events in the schedule
* `GET /speakers` shows a list of people speaking at the conference
* `GET /posts` shows a list of the blog posts made about the conference
* `GET /polls` shows a list of the live polls being made at the conference


Installation
===========

To run this, need node.js and NPM installed on your machine.

You also need a MongoDB database up and running.

Run the commands `npm install` and then `npm start`. The API will be available by default on port 3000.
