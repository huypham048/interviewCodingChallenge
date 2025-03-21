/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

function validateMatch(bingoCard, drawnNumbers, pos, steps) {
  let i = 0;

  while (i < drawnNumbers.length) {
    if (pos === 12) {
      pos += steps;
      continue;
    }
    if (bingoCard[pos] !== drawnNumbers[i]) return false;
    pos += steps;
    ++i;
  }
  return true;
}

function checkForBingo(bingoCard, drawnNumbers) {
  //assuming there is only one free spot on the bingo card
  if (drawnNumbers.length < 4) return false;

  //the prompt does not mention whether the drawnNumbers array provided will be guranteed to be sorted so I am sorting it to be sure
  drawnNumbers.sort((a, b) => a - b);

  //find index of smallest drawn number
  const firstDrawnNumPos = bingoCard.indexOf(drawnNumbers[0]);

  //check row for matches
  if (
    firstDrawnNumPos % 5 === 0 &&
    validateMatch(bingoCard, drawnNumbers, firstDrawnNumPos, 1)
  )
    return true;

  // //check column for matches
  if (
    firstDrawnNumPos >= 0 &&
    firstDrawnNumPos < 5 &&
    validateMatch(bingoCard, drawnNumbers, firstDrawnNumPos, 5)
  )
    return true;

  //check diagonal for matches
  if (
    (firstDrawnNumPos === 0 || firstDrawnNumPos === 20) &&
    validateMatch(bingoCard, drawnNumbers, firstDrawnNumPos, 6)
  )
    return true;

  return false;
}

module.exports = checkForBingo;

// here are some samples

// this should return true with diagonal + free
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      'FREE',
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [8, 24, 53, 72]
  )
);

// this should return false
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      'FREE',
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [1, 33, 53, 65, 29, 75]
  )
);
