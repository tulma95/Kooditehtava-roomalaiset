const main = () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.question('Syötä roomalainen luku käyttäen merkkejä I,V,X,L,C,D,M\n', (input) => {
    if (validate(input)) {
      console.log(`Luku kymmenjärjestelmässä: ${countRoman(input)}`);
    } else {
      console.log('Virheellinen syöte');
    }
    readline.close()
  })
}


const validate = (input) => {

  const trimmedInput = input.trim()

  const onlyValidRomanNumbers = /^(I|V|X|L|C|D|M)*$/
  const substractionRules = /I(L|C|D|M)|X(D|M)/
  const repetition = /(\w)\1\1\1+/

  if (onlyValidRomanNumbers.test(trimmedInput)) {
    if (substractionRules.test(trimmedInput) || repetition.test(trimmedInput)) {
      return false
    }
    return true
  }
  return false
}


const countRoman = (romanNumerals) => {
  const numbers = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let sum = 0
  const split = romanNumerals.trim().split('')

  for (let i = split.length - 1; i >= 0; i--) {
    const current = numbers[split[i]]
    const previous = numbers[split[i - 1]]

    if (!previous) {
      sum += current
    } else if (current < previous) {
      sum += current
    } else if (current == previous) {
      sum += current
    } else {
      sum += current - previous
      i--
    }
  }
  return sum
}

main()