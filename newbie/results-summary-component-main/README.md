# Frontend Mentor - Results summary component solution

This is a solution to the [Results summary component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/results-summary-component-CE_K6s0maV). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

Shows the results of a test using CSS flexbox and HTML.

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

<img src="assets\images\results-summary-desktop.png" alt="desktop" width="398"/>
<img src="assets\images\results-summary-mobile.png" alt="mobile" height="300"/>

### Links

- Solution URL: [https://github.com/imvan2/results-summary-component](https://github.com/imvan2/results-summary-component)
- Live Site URL: [Live Site](https://imvan2.github.io/results-summary-component/)

## My process

I began by creating the HTML and simple styling such as coloring, font, font-size, etc. Then I positioned containers with the use of CSS flexbox.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox

### What I learned

- How to use CSS flexbox to position containers into where you want it

```css
.results-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

- That sometimes you need to unset or reset container position for mobile view

```css
.results-container {
  position: static;
  flex-direction: column;
}
```

- How to do specific border radius for corners

```css
.results-container {
  border-top-right-radius: 0%;
  border-top-left-radius: 0%;
}
```

### Continued development

I want to continue focusing on using CSS flexbox to position containers and children. It seems like a very easy way of doing things. Next, I think I will learn how to position items using CSS grid.

### Useful resources

- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - This helped me understand what they can do with flexbox.

## Author

- Website - [Github](https://github.com/imvan2)
- Frontend Mentor - [@imvan2](https://www.frontendmentor.io/profile/imvan2)
