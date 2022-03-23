const generateAnswer = require("./generate-answer")

const months    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

for (let year = 2022; year < 5000; year++) {
  for (let month = 0; month < months.length; month++) {
    for (let day = 1; day <= monthDays[month]; day++) {
      const seed = year.toString() + (("0" + months[month]).slice(-2)).toString() + (("0" + day).slice(-2)).toString()
      if ((generateAnswer(seed) === [{suit: "spade", number: 1}, {suit: "spade", number: 13}, {suit: "spade", number: 12}, {suit: "spade", number: 11}, {suit: "spade", number: 10}]) || (generateAnswer(seed) === [{suit: "heart", number: 1}, {suit: "heart", number: 13}, {suit: "heart", number: 12}, {suit: "heart", number: 11}, {suit: "heart", number: 10}]) || (generateAnswer(seed) === [{suit: "diamond", number: 1}, {suit: "diamond", number: 13}, {suit: "diamond", number: 12}, {suit: "diamond", number: 11}, {suit: "diamond", number: 10}])  || (generateAnswer(seed) === [{suit: "club", number: 1}, {suit: "club", number: 13}, {suit: "club", number: 12}, {suit: "club", number: 11}, {suit: "club", number: 10}])) {
        console.log("Hit!!!!!!!!!!!!!!!!!!!")
        console.log(year.toString() + "/" + (month + 1).toString() + "/" + day.toString())
      }
    }
  }
}
