const generateAnswer = require("./generate-answer")

const months    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

for (let year = 2022; year < 2100; year++) {
  for (let month = 0; month < months.length; month++) {
    for (let day = 1; day <= monthDays[month]; day++) {
      const seed = year.toString() + (("0" + months[month]).slice(-2)).toString() + (("0" + day).slice(-2)).toString()
      const answer = generateAnswer(seed)
      if ((answer[0].suit === "spade" && answer[0].number === 1 && answer[1].suit === "spade" && answer[1].number === 13 && answer[2].suit === "spade" && answer[2].number === 12 && answer[3].suit === "spade" && answer[3].number === 11 && answer[4].suit === "spade" && answer[4].number === 10) || (answer[0].suit === "heart" && answer[0].number === 1 && answer[1].suit === "heart" && answer[1].number === 13 && answer[2].suit === "heart" && answer[2].number === 12 && answer[3].suit === "heart" && answer[3].number === 11 && answer[4].suit === "heart" && answer[4].number === 10) || (answer[0].suit === "diamond" && answer[0].number === 1 && answer[1].suit === "diamond" && answer[1].number === 13 && answer[2].suit === "diamond" && answer[2].number === 12 && answer[3].suit === "diamond" && answer[3].number === 11 && answer[4].suit === "diamond" && answer[4].number === 10) || (answer[0].suit === "club" && answer[0].number === 1 && answer[1].suit === "club" && answer[1].number === 13 && answer[2].suit === "club" && answer[2].number === 12 && answer[3].suit === "club" && answer[3].number === 11 && answer[4].suit === "club" && answer[4].number === 10)) {
        console.log("Hit!!!!!!!!!!!!!!!!!!!")
        console.log(year.toString() + "/" + (month + 1).toString() + "/" + day.toString())
        return
      }
    }
    console.log(year.toString() + "/" + (month + 1).toString())
  }
}
