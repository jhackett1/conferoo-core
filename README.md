Conferoo Core
============

This is an Express application intended for paperless conferences.

It is the central piece of software in a Conferoo platform, serving an API intended for consumption by separate client apps.

You should use it alongside Conferoo Publisher for content management by conference organisers. For end users, you can use web or native front-end apps.


HTTP API
========

Conferoo exposes a RESTful HTTP API with the following endpoints:

* `GET /api/events` shows a list of all events in the schedule
* `GET /api/speakers` shows a list of people speaking at the conference
* `GET /api/posts` shows a list of the blog posts made about the conference
* `GET /api/polls` shows a list of all polls being made at the conference
* `GET /api/media` shows a list of the media uploaded to the Conferoo server
* `GET /api/users` shows a list of the users who have signed in via Google

A single item can be fetched by id from each endpoint. For example:

* `GET /api/events/9999999` will show only the event with an id of 9999999

Image uploads
-----------

Conferoo is, partly, a content management system, accepting image uploads. All uploads must be authorised via a user token (not necessarily admin), and can be made as a multipart/form-data POST request to `POST /api/media`.

Conferoo will process a 80x80px preview image, save both files to an Amazon S3 bucket (storing them temporarily in a `/tmp` folder), and record the locations in a database entry.

It does not rely on local storage, making it suitable for serverless deployment via Heroku.

Authentication
-------------

**Authentication not working?** Are all your config vars set?

All API endpoints also accept `POST`, `PATCH` and `DELETE` requests, but require authentication.

Conferoo works with Google's OAuth2 flow to identify a user and populate its local user table with profile info from Google. Users with a `@faststream.civilservice.gov.uk` email address can sign up/in hassle-free.

Once a user has signed in via Google, they will be issued with a JSON web token that must be supplied with all subsequent requests. Tokens expire after 48 hours and must be re-issued.

All requests that require authentication must be made over HTTPS.

Some endpoints (eg. publishing blog posts via the `POST /posts` endpoint) require further admin permissions, which can be granted to particular users, once initially signed in, via a boolean in the local user table.


Websockets API
==============

Conferoo also has a websockets API to enable certain real-time operations, including submitting responses to polls.

The websockets API also requires authentication by a JWT.


Slack integration
================

Conferoo can send notifications to a Slack channel when new content (limited to posts and polls) is published. An incoming webhook URL must be supplied in the environment `process.env.SLACK_WEBHOOK` variable.


Installation
===========

To run this, need node.js and NPM installed on your machine. Check this with `node -v` and `npm -v`.

You also need a MongoDB database up and running.

The Google user authentication flow requires a project to be set up via the Google Developer Console, with the G+ API turned on. A client ID and secret are needed.

Run the commands `npm install` and then `npm start`. The API will be available by default on port 3000.
