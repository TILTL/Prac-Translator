# Super-Translator

Super-Translator is a React Web, which can get jokes from a third party APIs, and translates it in different languages using another third party API.

## Getting Started

These instructions will help you get and run a copy of the project on your local computer for development purposes. Before you begin, make sure the following requirements are met:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

### How to Installing / Running

To install Super Translator, follow these steps:

1. Clone the repository: [Prac_Translator](https://github.com/TILTL/Prac-Translator)

2. Navigate to the project directory: cd ./my_translator

3. Install all dependencies: npm install

4. Run the web: npm start

## Design Introduction

The app is built by React using functional components and hooks. It takes jokes from a public API and translates them into a target language of the user's choice. Users can also customise their own jokes and translate them in the input box. The app supports multi-language translation

In order to make the application more readable, efficient and maintainable, the application has been designed with modularity in mind and has been split into separate functional components. The Axios library is used to handle HTTP requests and AntD is used to build the user interface components.

- **AntD**: This design system provides a set of high quality React components that are very flexible and easy to use. This saves time that would otherwise be spent on styling and allows me to focus more on core functionality.

- **Axios**: Axios was chosen over the fetch API because it has a more readable and concise syntax, has built-in conversion requests and responses, and is compatible with multiple browsers.

- **Functional Components and Hooks**: I used functional components and hooks because it is easier to understand and has a cleaner, more readable syntax than class components. Using functional components and hooks also improves performance in my web
