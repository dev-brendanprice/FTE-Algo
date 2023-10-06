// RLE ENCODE
export function rle(str) {
  
    let output = '';

    // Loop over input, 7 chars a time (each block is 7 chars without reference char)
    for (let i=0; i<str.length; i+=7) {

        let count = 1;

        // If next code is same as current one, increment count, move to next
        while (i+7 < str.length && str.substring(i, i+7) === str.substring(i+7, i+14)) {
            i+=7;
            count++;
        };

        // Append code and count to output string
        output += str.substring(i, i+7) + count;
    };

    return output;
};

// RLE DECODE
export function rld(str) {

    let output = '';

    // Split the string into an array of hex codes and counts
    let codes = str.split('#').filter(Boolean);

    // Loop over each code
    for (let i=0; i<codes.length; i++) {

        // Get the hex color code and the count
        let hexCode = codes[i].substring(0, 6);
        let count = Number(codes[i].substring(6));

        // Repeat the hex color code 'count' number of times
        while (count-- > 0) {
            output += '#' + hexCode;
        };
    };

    return output;
};