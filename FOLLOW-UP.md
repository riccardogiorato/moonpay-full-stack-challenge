# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?

I used "create-next-app" that added these libraries:
- react, react-dom, and next to be able to run Next.js


I decided to use Typescript so always "create-next-app" added a few extra dependencies for it to work:
- @types/react, @types/node and typescript

I manually added a single library:
- "framer-motion": it's a react animation library, I used it to animate the grid of currencies cards when the list changes with only a few lines of code.

### Q) What's the command to start the frontend application locally?

First make sure to install the dependencies with "yarn install" then launch "yarn dev"

### Q) What libraries did you add to the backend? What are they used for?

I used the same libraries as the frontend cause I wanted to use Next.js API Routes that mimic express routes but keep the code tiny and simple, it also handles all the hot reloading automatically, redirects and more.

I manually added a single library:
- "undici": it's a modern HTTP client much faster than the legacy "http" module, it's also built by the Node.js core team; I used to make the API calls to the Exchanges APIs.

### Q) What's the command to start the backend application locally?

Like the frontend, first make sure to install the dependencies with "yarn install" then launch "yarn dev"

### Q) Any other comments we should read before evaluating your solution?

I didn't add Tailwind CSS because I didn't want to add a dependency to the frontend build process considering that only 1 task from the requirements mentioned CSS.
If I had to expand this project in a real "work environment" I would have added Tailwind CSS but I choose to only write a little CSS as possible to style the few buttons and cards inside "src/styles/globals.css".

I published the two apps running live on Vercel:
1. https://moonpay-frontend.riccardogiorato.com/
2. https://moonpay-backend.riccardogiorato.com/exchange-routing?amount=1

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

I would probably try to make the frontend controls more beautiful, with a better UX, but I didn't want to focus too much on the design considering that it wasn't the main focus of the project.

### Q) Which parts are you most proud of? And why?

Probably the "GetExchangeOrderBook", I was able to make it work with many exchanges like "ftx", "kraken", "bitstamp" and "gemini" by only changing the endpoint and the "getData" function, a function used to convert the API responses to a common shape for the arrays of asks and bids.

### Q) Which parts did you spend the most time with? What did you find most difficult?

Understanding the order book and the API responses was the most difficult part of the project.

I have always used exchanges by working with a simple UI by only using "Market Orders" without looking deeply at how these orders were fulfilled.
Learning more about asks and bids was awesome! 

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

It was the most pleasurable test I have done in a long time, especially being able to work with MoonPay API and other APIs felt great and very realistic. 

I would only suggest adding "Gitpod" support.

Gtipod is a tool to create automated dev environments and it's very useful for people that can't run Docker locally to check if their code is working.

#### Why Gitpod?

In the past I mentored various engineers/developers that had this problem with Docker, not being able to execute the code locally and many other times having their laptops become super slow when starting Docker.

Gitpod would solve all these issue cause you only need a web browser, all the code actually runs in a remote linux machine. It's free up to 40 hours every month for everyone: https://www.gitpod.io/pricing

I already added the ".gitpod.yml" to the root of the project, it's a file that contains the gitpod configuration to work with the current docker compose and the two apps.