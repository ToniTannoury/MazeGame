const game = document.getElementById("game-container")
const landing = document.querySelector('.wrapper')
const startButton = document.querySelector('.button').addEventListener('click' , (e)=>{
  e.preventDefault()
  console.log(11)
  game.style = 'display:block;'
  landing.style = 'display:none;'
})