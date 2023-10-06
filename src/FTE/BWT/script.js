// BWT ENCODE
export function bwtEncode(str) {

    let rotations = [];

    // Form all (cyclic) rotations from input
    for (let i = 0; i<str.length; i++) {
        let rotation = str.slice(i) + str.slice(0, i);
        rotations.push(rotation);
    };

    // Sort rotations alphabetically
    rotations.sort();

    // Take chars from last column, top-bottom
    let output = '';
    for (let rotation of rotations) {
        output += rotation[rotation.length - 1];
    };

    return output;
};
  
// BTW DECODE
export function bwtDecode(str) {
  
    // Init a count arr with 256 zeros
    let count = new Array(256).fill(0);
    let next = new Array(str.length); // Arr to hold indicies
    let sorted = str.split('').sort(); // Sort chars from str

    // Count occurrences of each char in the input string
    for (let i = 0; i < str.length; i++) {
        count[str.charCodeAt(i)]++;
    };

    // Calc the cumulative count of chars
    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    };

    // Construct next arr
    for (let i = str.length - 1; i >= 0; i--) {
        next[--count[str.charCodeAt(i)]] = i;
    };


    let output = '';
    let idx = next[0];

    // Reconstruct original string by following next indices
    for (let i = 0; i < str.length; i++) {
        output += sorted[idx];
        idx = next[idx];
    };

    return output;
};