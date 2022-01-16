# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?

I used "create-next-app" that added these libraries:
- react, react-dom, and next were added to be able to run Next.js


I decided to use Typescript so always "create-next-app" added a few extra dependencies for it to work:
- @types/react, @types/node and typescript were added to use Typescript features in the project

I manually added a single library:
- "framer-motion": it's a react animation library, I used it to animate the grid of currencies cards when the list changes with only a few lines of code.

### Q) What's the command to start the frontend application locally?

```bash
yarn dev
```
Make sure to install the dependencies with "yarn install" then launch "yarn dev".

### Q) What libraries did you add to the backend? What are they used for?

I used "create-next-app" like the frontend part of the challenge.
The same default libraries were added as the frontend project.

I choose to use "create-next-app" and Next.js also on the backend side to use API Routes.
The Next.js API Routes mimic Express routes but keep the code tiny and simple, it also handles all the hot reloading automatically, redirects and much more.

I manually added a single library:
- "undici": it's a modern HTTP client much faster than the legacy "http" module, it's also built by the Node.js core team; I used to make the API calls to the Exchanges APIs.

### Q) What's the command to start the backend application locally?

```bash
yarn dev
```
Like the frontend, make sure to install the dependencies with "yarn install" then launch "yarn dev".

### Q) Any other comments we should read before evaluating your solution?

I didn't add Tailwind CSS to the frontend because I didn't want to add a dependency to the build process considering that only 1 task from the requirements mentioned CSS.
If I had to expand this project in a real "work environment" I would have added Tailwind CSS but I choose to only write a little CSS as possible to style the few buttons and cards inside "frontend/src/styles/globals.css".

I published the two apps running live on Vercel:
1. https://moonpay-frontend.riccardogiorato.com/
2. https://moonpay-backend.riccardogiorato.com/exchange-routing?amount=1

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

I would probably try to make the frontend controls more beautiful, with a better UX.
I didn't focus too much on the design of the controls cause it wasn't the main focus of the project and I didn't have a specific design to implement.

### Q) Which parts are you most proud of? And why?

Probably the **"GetExchangeOrderBook"** on the backend app, it's the function to get the order books from the different APIs.

I was able to make it work with many exchanges like "ftx", "kraken", "bitstamp" and "gemini" by only changing the endpoint and the "getData" function, a function used to convert the API responses to a common shape for the arrays of asks and bids.

### Q) Which parts did you spend the most time with? What did you find most difficult?

Understanding the order book and the API responses was the most difficult part of the project.

I have always used exchanges by working with a simple UI by only using "Market Orders" without looking deeply at how these orders were fulfilled.
Learning more about asks and bids was awesome! 

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

It was the most pleasurable test I have done in a long time, especially being able to work with MoonPay API and other APIs felt great and very realistic. 

I would only suggest adding "Gitpod" support. Gitpod is a tool to create automated dev environments and it's very useful for people that can't run Docker locally to check if their code is working.

#### Why Gitpod?

In the past I mentored various engineers that had many issues with Docker. Most weren't able to execute the Docker instances locally and many other times their laptops become super slow when Docker was running.

Gitpod would solve all these issue cause you only need a web browser! All the code and Docker would actually run in a remote linux machine. It's free up to 40 hours every month for everyone: https://www.gitpod.io/pricing

#### How?

I already added the ".gitpod.yml" to the root of the project, it's a file that contains the gitpod configuration to work with the current docker compose and the two apps.

If you do these 2 steps everyone will be able to launch the project on Gitpod with 1 click:
1. Copy the ".gitpod.yml" file to the root of the project from my submission
2. Add this markdown to the project README.md file:

```html
<a href="https://gitpod.io/#https://github.com/moonpay/full-stack-challenge">
    <img src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod" alt="Gitpod Ready to Code">
</a>
```