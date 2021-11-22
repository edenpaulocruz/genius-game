(function () {
  'use strict'

  const startButton = document.querySelector('[data-js="start-button"]')
  
  const geniusButtons = [
    document.querySelector('[data-js="green-button"]'),
    document.querySelector('[data-js="red-button"]'),
    document.querySelector('[data-js="blue-button"]'),
    document.querySelector('[data-js="yellow-button"]')
  ]

  let order = []
  let clickedOrder = []
  let score = 0

  const resetGame = () => {
    score = 0
    order = []
  }  

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

  async function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4)
    order.push(colorOrder)
    clickedOrder = []
    
    for (let count in order) {
      await lightColor(geniusButtons[order[count]])
    }
  }

  const playGame = () => {
    resetGame()
    shuffleOrder()
  }

  const gameOver = () => {
    if (order.length === 0 && clickedOrder.length > 0) {
      console.log('Clique em START para começar um novo jogo!')
    } else {
      console.log('Você errou!')
    }
    resetGame()
  }

  const nextLevel = () => {
    score++
    console.log(`Você acertou! Sua pontuação é ${score}!`)
    shuffleOrder()
  }

  const checkOrder = () => {
    for (let j in clickedOrder) {
      if (clickedOrder[j] != order[j]) {
        return gameOver()
      } 
    }

    if (clickedOrder.length === order.length) {
      return nextLevel()
    }
  }
 
  geniusButtons.forEach((button, index) => button.onclick = () => {
    clickedOrder.push(index)
    lightColor(button)
    setTimeout(() => {
      checkOrder()
    }, 500)
    console.log(clickedOrder)
  })

  startButton.addEventListener('click', () => playGame())

})()