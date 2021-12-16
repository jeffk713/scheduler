# Interview Scheduler

## Contents

- [General info](#general-info)
- [Sample image](#sample-image)
- [Tech stack](#tech-stack)
- [Set up](#set-up)

## General info

- Web app scheduler where multi users can manage interviews
- Deployed via Netlify: https://hungry-engelbart-176691.netlify.app/

## Sample images

Web app view
![sample1](https://github.com/jeffk713/scheduler/blob/master/sample-images/image1.png?raw=true)
Upon booking an appointment
![sample2](https://github.com/jeffk713/scheduler/blob/master/sample-images/image2.png?raw=true)
Upon canceling an appointment
![sample3](https://github.com/jeffk713/scheduler/blob/master/sample-images/image3.png?raw=true)

## Tech stack

- Front-end: React.js; Custom hooks with useReducer & useRef implemented
- Testing: Notebook, Jest; unit testing, Cypress; integration testing
- Web-socket: Web socket implemented for multiplie user usage
- Back-end: pre-written Express.js from project template
- Database: pre-written SQL from project template

## Setup

Install dependencies

```bash
npm install
```

Running Webpack Development Server

```bash
npm start
```

Running Cypress Test

```bash
npm run cypress
```

Running Jest Test

```bash
npm test
```

Running Storybook Visual Testbed

```bash
npm run storybook
```
