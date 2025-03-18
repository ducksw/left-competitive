const help = {};

help.randomNumber = () => {
  //const character = "abcdefghijklmnopqrstuvwxyz0123456789"
  const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  let randomNumber = 0
  for (let i = 0; i < 15; i++) {
    randomNumber += character.charAt(Math.floor(Math.random() * character.length))
  }

  return randomNumber
}

module.exports = help
