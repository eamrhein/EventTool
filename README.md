[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# EventTool
#### A web to built with React/Redux and GraphQL to manage creating eventbrite Events.
![Welcome](/images/Welcome.png)
## About The Project
EventTool is a web tool to allow users to create Eventbrite events from many locations all at once. The tool is built for a user to create a single event and then post it for many locations At once.

## Key Features
+ Event Creation
  + Users can create events in the same way as regular Eventbrite Website.
+ Serside Event Scheduling
  + Users can publish events to be working at a future date.
+ Batching and throttling event publishing.
  + Events are Published in intervals of 10 each every 5 minutes.
+ User Authentication
  + Users can create a new account or log in with an existing one
  + Passwords are encrypted using BCrypt and appropriate errors are rendered when a login or signup form is filled incorrectly.
+ Interacts With the eventbrite API.

### Technologies
- [Eventbrite API](https://www.eventbrite.com/platform/api)
- [GraphQL](https://graphql.org/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [mongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [Grommet](https://v2.grommet.io/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone EventTool

```sh
git clone https://github.com/eamrhein/EventTool.git
```

2. Install NPM packages

```sh
npm install
```

or

```sh
yarn install
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Eric Amrhein - [@MrEricAmrhein](https://twitter.com/MrEricAmrhein) - eamrhein@protonmail.ch

## Acknowledgements

- [CoAchieve](https://coachieve.co)

[issues-shield]: https://img.shields.io/github/issues/eamrhein/EventTool.svg?style=flat-square
[issues-url]: https://github.com/eamrhein/EventTool/issues
[license-shield]: https://img.shields.io/github/license/eamrhein/EventTool?style=flat-square
[license-url]: https://github.com/eamrhein/EventTool/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/eamrhein
[product-screenshot]: images/screenshot.png
