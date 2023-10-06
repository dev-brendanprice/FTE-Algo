// MTF ENCODE
export function mtfEncode(str) {

    let alp = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let output = [];

    // Loop over str len
    for (let i=0; i<str.length; i++) {
        
        let char = str[i];
        let index = alp.indexOf(char);
        
        // Move char to front
        alp.splice(index, 1);
        alp.unshift(char);
        
        // Add index to output
        output.push(index);
    };

    return output;
};
  
// MTF DECODE
export function mtfDecode(str) {

    let alp = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let output = '';

    for (let i=0; i<str.length; i++) {

        let index = str[i];
        let char = alp[index];

        // Move char to front
        alp.splice(str, 1);
        alp.unshift(char);

        // Add char to output
        output += char;
    };

    return output;
};