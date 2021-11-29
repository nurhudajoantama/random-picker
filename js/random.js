//  RANDOMIZE FUNCTION

/**
 * Random pick
 * It will create random index from array
 * and return array on that random index
 * @param {Array} arr
 * @returns {String}
 */
function randomPick(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const result = arr[randomIndex];

  return result;
}

/**
 * Fisher-Yates shuffle
 * with random index
 * Will return random body array
 * @param {Array} arr
 * @returns {Array}
 */
function randomSort(arr) {
  var i = arr.length;
  if (i == 0) return false;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = arr[i];
    var tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
}

/**
 * This function just creating group from array
 * with slicing array with n
 * @param {Array} arr
 * @param {Number} n
 * @returns
 */
function makeGroup(arr, n) {
  if (!n || isNaN(n) || n < 1) return;
  var result = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, n));
  }
  return result;
}
