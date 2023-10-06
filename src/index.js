import fs from 'fs';
import decode from 'image-decode';
import encode from 'image-encode';
import { rld, rle } from './FTE/RLE/script.js';

const log = console.log.bind(console);

// Get pixels from image
let fubar = ImageToPixels('img.jpeg');
let rgbArray = fubar.data;
let width = fubar.width;
let height = fubar.height;

function compress() {

    // Convert rgb to hex codes
    let hexCodes = rgbToHex(rgbArray);

    // Compress hex codes
    let encoded = rle(hexCodes);

    // Write compressed hex codes to file
    fs.writeFileSync('out.txt', encoded);

    fs.writeFileSync('out.txt', rle(rgbToHex(rgbArray)));
    // fs.writeFile('out.txt', rle(rgbToHex(rgbArray)), () => {});
};

function decompress() {

    // Read file contents
    let contents = fs.readFileSync('out.txt').toString();

    // RLD contents
    let decoded = rld(contents);

    // Convert hex to rgb codes
    let rgbCodes = hexToRGB(decoded);

    // Convert rgb codes to image
    PixelsToImage('out.jpeg', rgbCodes, width, height);

};


// Test
// let n = 450;
// for (let i=0; i<n; i++) {
//     compress();
// };

compress();
decompress();


function ImageToPixels(path) {

    // data = [r, g, b, a, r, g, b, a, ...]
    let {data, width, height} = decode(fs.readFileSync(path));
    return {data, width, height};
};

function PixelsToImage(path, data, width, height) {
    fs.writeFileSync(path, Buffer.from(encode(data, [width, height], 'jpg')));
};


function rgbToHex(rgbArray) {
    let hexString = '';
    for (let i=0; i<rgbArray.length; i+=4) {
        hexString += `#${((1 << 24) | (rgbArray[i] << 16) | (rgbArray[i + 1] << 8) | rgbArray[i + 2]).toString(16).slice(1)}`;
    };
    return hexString;
};


function hexToRGB(hexString) {

    const rgbArray = [];

    // Remove any '#' characters from the input string
    const cleanedHexString = hexString.replace(/#/g, '');
  
    // Iterate through the cleaned hex string in steps of 6 (to handle RGBA)
    for (let i = 0; i < cleanedHexString.length; i += 6) {
        const hexCode = cleanedHexString.substr(i, 6);

        // Parse the hex code into separate R, G, and B components
        const r = parseInt(hexCode.substr(0, 2), 16);
        const g = parseInt(hexCode.substr(2, 2), 16);
        const b = parseInt(hexCode.substr(4, 2), 16);

        // Push R, G, B, and A values into the result array
        rgbArray.push(r, g, b, 255); // Assuming alpha is 255 (fully opaque)
    };
  
    return rgbArray;
};
