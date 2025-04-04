# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is a HTML/CSS practice project.

### Screenshot

![Desktop Image](./desktop-image.jpg)
![Mobile Image](./mobile-image.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

I built this with HTML first, then CSS. For CSS, I started off with the basic stylings, such as font, color, borders, image size, etc. Then I moved on to structuring each container into the right layout.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS grid

### What I learned

- how to center an image as a block:

```css
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

- how to center a container:

```css
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
```

- how to center items inside the container:

```css
.inside-container {
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
```

- how to center text inside a container:

```css
.text {
  position: relative;
  text-align: center;
}
```

- how to write CSS for mobile view:

```css
@media only screen and (max-width: 768px) {
  body {
    width: 768px;
    height: auto;
  }
}
```

### Continued development

I need to get more comfortable with centering using CSS and hopefully eventually learning how to center using CSS flexbox.

### Useful resources

- [W3 Center](https://www.w3.org/Style/Examples/007/center#block) - This helped me to learn how to center text and images.

## Author

- Website - [Github](https://github.com/imvan2)
- Frontend Mentor - [@imvan2](https://www.frontendmentor.io/profile/imvan2)
