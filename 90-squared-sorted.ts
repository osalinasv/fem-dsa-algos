const source = [-6, -3, -1, 0, 1, 2, 5];
console.log(source);

function sortedSquares(array: number[]) {
  let left = 0;
  let right = array.length - 1;

  // Make a new array because I cannot find a way to make O(n) time work with
  // constant memory as well, can I even sort while iterating once with swaps?
  const ans = new Array<number>(array.length);

  for (let i = right; i >= 0; i--) {
    let value: number;

    // Look at both current extremes and choose largest absolute value, that
    // will be the chosen squared for the ith position. Move the extremes
    // inward after choosing either of them, towards the center of the array
    // which will tend to have the lowest absolute value.
    //
    // ith position is traveled backwards because we want to fill the response
    // array from largest square to smallest.
    if (Math.abs(array[left]) > Math.abs(array[right])) {
      value = array[left] * array[left];
      left++;
    } else {
      value = array[right] * array[right];
      right--;
    }

    ans[i] = value;
    console.log(ans);
  }

  return ans;
}

console.log(sortedSquares(source));
