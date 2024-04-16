
const longestCommonPrefix = function (strs) {
    let res = "";
    let prefixLen = 0;
    let strLenArr = strs.map(str => str.length);
    const min = Math.min(...strLenArr); // Find the length of minimum char string in given array
    while (prefixLen < min) { // String with min char can be the prefix at maximum  
        for (let j = 1; j < strs.length; j++) {
            if (strs[0].charAt(prefixLen) !== strs[j].charAt(prefixLen)) return res; // Check each character of first string with other strings at same index
        }
        res += strs[0].charAt(prefixLen);
        prefixLen++;
    }
    return res;
};