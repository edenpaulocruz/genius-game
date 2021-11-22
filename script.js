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
    renderScore()
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

  const toggleModal = () => {
    if (document.querySelector('[data-js="modal"').style.display == 'none') {
      document.querySelector('[data-js="modal"').style.display = 'flex'
    } else {
      document.querySelector('[data-js="modal-message"]').textContent = ''
      document.querySelector('[data-js="modal"').style.display = 'none'
    }
  }

  const renderMessage = text => {
    document.querySelector('[data-js="modal-message"]').textContent = text
    toggleModal()
  }
  
  document.querySelector('[data-js="close-modal"]').addEventListener('click', toggleModal)

  const gameOver = () => {
    renderMessage(`Você acertau ${score} rodada(s)! Clique em START e tente outra vez!`)
    resetGame()
  }

  const nextLevel = () => {
    score++
    renderScore()
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

  function renderScore() {
    document.querySelector('.score-number').textContent = score
  }
 
  geniusButtons.forEach((button, index) => button.onclick = () => {
    clickedOrder.push(index)
    lightColor(button)
    setTimeout(() => {
      checkOrder()
    }, 500)
  })

  renderScore()

  startButton.addEventListener('click', () => playGame())

})()