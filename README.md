<h1>V - Elect</h1>

A voting POC based on Ethereum parity.

Build on MEAN stack - Mongo, Express, Angular 2, And NodeJs.

<h2> Building Instructions</h2>

<b>Pre- requisites</b>
Mongodb should be running.

Download code from GIT

1)cd to project root folder
$ npm install
2)
$ cd ui 
$ npm install
Go back to project root
$ cd ..

2) Run in Development mode - from project root after step 1 
<code>npm run dev</code>

 
3) Angular app in dev mode is served at 
http://localhost:4200/


Your app is at 3000 - example
http://localhost:3000/api/user/all


If you want to run in Prod mode - no live reload of client or server
<code> npm start</node> 

In prod Mode- 
App - http://localhost:3000/
API - http://localhost:3000/api/user/all


To Do -
<ul>
<li> remove post in get calls </li>
<li>Modify Home Screen and Show Different Journeys _ Imran</li>
<li>Create Election Ballot UI -- Mohit B (Done)</li>
<li>Create Election Ballot- Blockchain</li>
<li>Create Nomination UI- Mohit Bharti (Done)</li>
<li>Nominate Blockchain</li>
<li>Accept Nomination UI -- Adjudicator </li>
<li>Accept Nomination Blockchain </li>
<li>Citizen Page/ Dashboard UI</li>
<li>Citizen Vote UI</li>
<li>Citizen Vote Blockchain</li>
<li>Previous Election Vote - Itr 2</li>
<li>Close Election - UI</li>
<li>Close Election - Blockchain</li>
<li>Election results UI</li>
</ul>

Personas-
1. Citizens- Everyone
2. Conductor/ Adjudicator
3. Candidates

Home Pages-
1. Adjudicator Home page
2. Citizens Home page
3. Candidates Home page

Adjudicator - Create an election
Adjudicator - will accept Nomination
Adjudicator -- to close Nomination
Adjudicator - close an election - results page
----------------------------------------------------------------------
----------------------------------------------------------------------
Citizens
View Open elections
Nominate themselves
Cast their vote
-----------------------------------------------------------------------

ChangeLog:
1. Removed extraneous build steps to avoid confusion.
2. Added live reload in dev mode.
3. Added proxy config so that Angular Lite Serve and Node can run simultaneously without CORS issue.
4. Integrated Mohit's code


