// This file contains the JavaScript code for the website. It may include functions for interactivity, event handling, and DOM manipulation.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready!');
    
    // Example function to handle a button click
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button was clicked!');
        });
    }
});

let darkModeActive = false;
let navigationMenuActive = true;
  
// tabbed navigation

const tabbedMenu = () => {
  const tabbedButtons = document.querySelector(".tabbed-buttons").children;
  const tabbedContent = document.querySelectorAll(".tabbed-content");

  for (let i = 0; i < tabbedButtons.length; i++) {
    tabbedButtons[i].classList.add(`tabbed-group-${i + 1}`);
    tabbedContent[i].classList.add(`tabbed-group-${i + 1}`);
  }

  tabbedButtons[0].classList.add("tabbed-buttons-active");
  tabbedContent[0].classList.add("tabbed-content-active");

  for (let i = 1; i < tabbedContent.length; i++) {
    tabbedButtons[i].classList.add("tabbed-buttons-inactive")
    tabbedContent[i].classList.add("tabbed-content-inactive")
  }

  for (let i = 0; i < tabbedButtons.length; i++) {
    tabbedButtons[i].addEventListener("click", () => {
      if (tabbedButtons[i].classList.contains(`tabbed-group-${i}`) === tabbedContent[i].classList.contains(`tabbed-group-${i}`)) {
        for (let i = 0; i < tabbedContent.length; i++) {
          tabbedButtons[i].classList.replace("tabbed-buttons-active", "tabbed-buttons-inactive");
          tabbedContent[i].classList.replace("tabbed-content-active", "tabbed-content-inactive");
        }
        tabbedButtons[i].classList.replace("tabbed-buttons-inactive", "tabbed-buttons-active");
        tabbedContent[i].classList.replace("tabbed-content-inactive", "tabbed-content-active");
      }
    })
  }
}

tabbedMenu();

const menuButton = () => {
  const menuButton = document.querySelector(".menu-button");
  const navigationMenu = document.querySelector(".navigation-menu")

  menuButton.addEventListener('click', () => {
    console.log("I clicked a button")
    if (darkModeActive == false) {
      
      if (navigationMenuActive == true) {
        menuButton.style.backgroundImage = "url('./images/Closed-Menu-Icon-Black.png')";
        navigationMenu.classList.replace("menu-content-active", "menu-content-inactive");
        navigationMenuActive = false;
      } else {
        menuButton.style.backgroundImage = "url('./images/Open-Menu-Icon-Black.png')";
        navigationMenu.classList.replace("menu-content-inactive", "menu-content-active");
        navigationMenuActive = true;
      }

    } else {
      
      if (navigationMenuActive == true) {
        menuButton.style.backgroundImage = "url('./images/Closed-Menu-Icon-White.png')";
        navigationMenu.classList.replace("menu-content-active", "menu-content-inactive");
        navigationMenuActive = false;
      } else {
        menuButton.style.backgroundImage = "url('./images/Open-Menu-Icon-White.png')";
        navigationMenu.classList.replace("menu-content-inactive", "menu-content-active");
        navigationMenuActive = true;
      }

    }
  })
}

menuButton();

const darkMode = () => {
  const darkModeButton = document.querySelector(".dark-mode-button");
  const menuButton = document.querySelector(".menu-button");

  darkModeButton.addEventListener('click', () => {
    if (darkModeActive == false) {
      document.querySelector(':root').style.setProperty('--color-primary', '#1f1f1f');
      document.querySelector(':root').style.setProperty('--color-secondary', '#ffffff');
      document.querySelector(':root').style.setProperty('--color-accent', 'var(--color-light-gray)');
      document.querySelector('html').style.backgroundImage = "url('./images/Dark-Mode-Background.png')";
      darkModeButton.style.backgroundImage = "url('./images/Dark-Mode-Icon.png')";
      document.getElementById('github-icon').src="./images/GitHub-Icon-Dark.png";
      document.getElementById('linkedin-icon').src="./images/LinkedIn-Icon-Dark.png";
      
      if (navigationMenuActive == true) {
        menuButton.style.backgroundImage = "url('./images/Open-Menu-Icon-White.png')";
      } else {
        menuButton.style.backgroundImage = "url('./images/Closed-Menu-Icon-White.png')";
      }

      darkModeActive = true;

    } else {
      
      document.querySelector(':root').style.setProperty('--color-primary', '#ffffff');
      document.querySelector(':root').style.setProperty('--color-secondary', '#1f1f1f');
      document.querySelector(':root').style.setProperty('--color-accent', 'var(--color-light-lavender)');
      document.querySelector('html').style.backgroundImage = "url('./images/Light-Mode-Background.png')";
      darkModeButton.style.backgroundImage = "url('./images/Light-Mode-Icon.png')";
      document.getElementById('github-icon').src="./images/GitHub-Icon-Light.png";
      document.getElementById('linkedin-icon').src="./images/Linkedin-Icon-Light.png";

      if (navigationMenuActive == true) {
        menuButton.style.backgroundImage = "url('./images/Open-Menu-Icon-Black.png')";
      } else {
        menuButton.style.backgroundImage = "url('./images/Closed-Menu-Icon-Black.png')";
      }
      
      darkModeActive = false;
    
    }
  })
}

darkMode();

let text = "Hello, this is a typewriter effect using setInterval!";
let typwriter = document.querySelector(".typewriter");

function typeWriter(text) {
  let index = 0;
  let interval = setInterval(function () {
      if (index < text.length) {
          typwriter.innerHTML += text.charAt(index);
          index++;
      } else {
          clearInterval(interval);
      }
  }, 100); // Interval of 100ms
}