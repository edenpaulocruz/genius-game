(function () {
  'use strict'

  // const startButton = document.querySelector('[data-js="start-button"]')
  
  const geniusButtons = [
    document.querySelector('[data-js="green-button"]'),
    document.querySelector('[data-js="red-button"]'),
    document.querySelector('[data-js="blue-button"]'),
    document.querySelector('[data-js="yellow-button"]')
  ]
  
  const lightColor = element => {
    element.classList.add('selected')

    setTimeout(() => {
      element.classList.remove('selected')
    }, 350)
  }

  geniusButtons.forEach(button => button.onclick = () => lightColor(button))
})();