Conferoo-API
============

This is an (incomplete) Express application intended for paperless conferences.

It is the central piece of software in a Conferoo platform, serving an API intended for consumption by separate client apps.

API
===

Conferoo exposes a RESTful API with the following endpoints:

* `GET /api/events` shows a list of all events in the schedule
* `GET /api/speakers` shows a list of people speaking at the conference
* `GET /api/posts` shows a list of the blog posts made about the conference
* `GET /api/polls` shows a list of the live polls being made at the conference

A single item can be fetched by id from each endpoint. For example:

* `GET /api/events/9999999` will show only the event with an id of 9999999

Each endpoint can be filtered by adding query parameters to the URL. For example:

* `GET /api/events?time=1400` will only return events starting at 1400
* `GET /api/posts?author=example` will only return posts authored by example

Most but not all object properties are filterable.

Finally, endpoints are sortable via the `sort` query parameter:

* `GET /api/events?sort=time&order=asc` will list events in time order

File uploads
-----------

Conferoo is, partly, a content management system, accepting file uploads. All uploads must be authorised via an admin token, and can be made as a multipart/form-data POST request.

* `POST /api/upload` shows a list of all events in the schedule

Authentication
-------------

**Authentication not working?** Did you remember to 'source app.env'?

All API endpoints also accept `POST`, `PATCH` and `DELETE` requests, but require authentication.

Conferoo works with Google's OAuth2 flow to identify a user and populate its local user table with profile info from Google. Users with a `@faststream.civilservice.gov.uk` email address can sign up/in hassle-free.

Once a user has signed in via Google, they will be issued with a JSON web token that must be supplied with all subsequent requests. Tokens expire after 48 hours and must be re-issued.

All requests that require authentication must be made over HTTPS.

Some endpoints (eg. publishing blog posts via the `POST /posts` endpoint) require further admin permissions, which can be granted to particular users, once initially signed in, via a boolean in the local user table.

Slack integration
================

Conferoo can send notifications to a Slack channel when new content (limited to posts and polls) is published. An incoming webhook URL must be supplied in the environment `process.env.SLACK_WEBHOOK` variable.


Installation
===========

To run this, need node.js and NPM installed on your machine.

You also need a MongoDB database up and running.

The Google user authentication flow requires a project to be set up via the Google Developer Console, with the G+ API turned on. A client ID and secret are needed.

Run the commands `npm install` and then `npm start`. The API will be available by default on port 3000.
