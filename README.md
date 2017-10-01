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

Each endpoint can be filtered by adding query parameters to the URL. For example:

* `GET /events?time=1400` will only return events starting at 1400
* `GET /posts?author=example` will only return posts authored by example

Most but not all object properties are filterable.

Authentication
-------------

All API endpoints also accept `POST`, `PUT`, `PATCH` and `DELETE` requests, but require a valid token to be supplied.

To authenticate and receive a token, make a `GET` request to `/api/auth`, passing the username and password of an admin user in the header.

All requests that require authentication must be made over HTTPS.


Installation
===========

To run this, need node.js and NPM installed on your machine.

You also need a MongoDB database up and running.

Run the commands `npm install` and then `npm start`. The API will be available by default on port 3000.
