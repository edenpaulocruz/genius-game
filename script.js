(function () {
  'use strict'

  const startButton = document.querySelector('[data-js="start-button"]')
  
  const geniusButtons = [
    document.querySelector('[data-js="green-button"]'),
    document.querySelector('[data-js="red-button"]'),
    document.querySelector('[data-js="blue-button"]'),
    document.querySelector('[data-js="yellow-button"]')
  ]
  
  function lightColor(element) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        element.classList.add('selected')
    
        setTimeout(() => {
          element.classList.remove('selected')
          resolve()
        }, 200)
      }, 350)
    })
  }

  let order = []
  let clickedOrder = []
  let score = 0
  
  async function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4)
    order.push(colorOrder)
    console.log(order)
    
    for (let count in order) {
      await lightColor(geniusButtons[order[count]])
    }
  }

  const playGame = () => {
    score = 0
    shuffleOrder()
  }
  
  geniusButtons.forEach((button, index) => button.onclick = () => {
    lightColor(button)
    clickedOrder.push(index)
    console.log(clickedOrder)
  })

  startButton.addEventListener('click', () => playGame())

})()