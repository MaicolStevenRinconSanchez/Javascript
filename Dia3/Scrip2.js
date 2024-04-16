/** 
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function(dictionary, sentence) {
    let arr=sentence.split(' ')
    for(let i=0;i<arr.length;i++){
        for(let x of dictionary){
            if(arr[i].startsWith(x)){
                arr[i]=x
            }
        }
    }
    return arr.join(' ')
};