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

All API endpoints also accept `POST`, `PUT`, `PATCH` and `DELETE` requests, but require authentication.

Conferoo works with Google's OAuth2 flow to identify a user and populate its local user table with profile info from Google. Users with a `@faststream.civilservice.gov.uk` email address can sign up/in hassle-free.

All requests that require authentication must be made over HTTPS.

Some endpoints (eg. publishing blog posts via the `POST /posts` endpoint) require admin permissions, which can be granted to particular users, once signed in, via a boolean in the local user table.

Slack integration
================

Conferoo can send notifications to a Slack channel when new content (limited to posts and polls) is published. An incoming webhook URL must be supplied in the environment `process.env.SLACK_WEBHOOK` variable.


Installation
===========

To run this, need node.js and NPM installed on your machine.

You also need a MongoDB database up and running.

The Google user authentication flow requires a project to be set up via the Google Developer Console, with the G+ API turned on. A client ID and secret are needed.

Run the commands `npm install` and then `npm start`. The API will be available by default on port 3000.
