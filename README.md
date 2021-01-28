# 🎤 OrderCloud Voice
OrderCloud voice enables solution developers to quickly integrate their storefront via OrderCloud with the voice assistant for Amazon (Alexa). Specifically, users will be able to ask Alexa how their store is doing and get some quick diagnostics on what the order total was in a given time period.

[Check it out in action!](https://ordercloud-voice.herokuapp.com/assets/demo_1_1.mp4)

This simple functionality ships out of the box with our hosted solution - all you need to do is set up your interaction model as detailed [here](https://ordercloud-voice.herokuapp.com/). Now your users can simply find your skill in the Alexa application, log in via OrderCloud with their own credentials to link their account and start making queries for their store!

If however you want to extend the functionality we got you covered too. Simply clone this repository and host your own endpoints. Anywhere in the interaction model tutorial where you saw https://ordercloud-video.herokuapp.com simply update with your own domain. 

## ⚙️Local development

1. Install dependencies

```shell
npm install && npm install ts-node --g
```

2. Start the server
```shell
npm run start
```
