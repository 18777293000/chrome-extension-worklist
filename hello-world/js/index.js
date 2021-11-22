/**
 * 载入json文件并显示内容
 */
const XMLHttp = new XMLHttpRequest();
const url = '../wordlist.json';
let res = null;
let keys = null;
let currentSequence = null; //当前序号
let currentWordObj = null; //当前词的内容
let notFindWord = {
  wordRank: -1,
  headWord: '没这个词儿',
  content: {},
};
let pre = 0;
let current = 0;
XMLHttp.onreadystatechange = function(){
  if(XMLHttp.readyState === 4 && XMLHttp.status === 200){
    res = JSON.parse(XMLHttp.responseText);
    console.log(res);
    init();
  };
};
XMLHttp.open('GET', url, true);
XMLHttp.send();

function init(){
  keys = Object.keys(res);
  writeIn(0);
};

const inputEle= document.getElementById('input');
const btnEle = document.getElementById('btn');
const locateEle = document.getElementById('locate');

const translate = document.getElementById('translate');
const remember = document.getElementById('remember');
const example = document.getElementById('example');
const orderDisplay = document.getElementById('order');
const wordEle = document.getElementById('word');
const exampleTranslate = document.getElementById('example-translate');

locateEle.addEventListener('click', (e) => {
  const val = inputEle.value;
  const order = parseInt(val);
  writeIn(order);
});

btnEle.addEventListener('click', () => {
  console.log(currentSequence);
  writeIn(currentSequence + 1);
});

translate.addEventListener('click', () => {
  showRes(currentSequence);
})

function showRes(order){
  const currrentkey = keys[order];
  const currentVal = res[currrentkey] ? res[currrentkey] : notFindWord;
  translate.innerText = currentVal.content.trans.map(item=>item.pos+item.tranCn+'').join('~');
}

function writeIn(order){
  currentSequence = order;
  const currrentkey = keys[order];
  const currentVal = res[currrentkey] ? res[currrentkey] : notFindWord;
  console.log(currentVal);
  orderDisplay.innerText = order;
  wordEle.innerText = currentVal.headWord;
  // translate.innerText = currentVal.content.trans.map(item=>item.pos+item.tranCn+'').join('~');
  remember.innerText = currentVal.content.remMethod && currentVal.content.remMethod.val;
  example.innerText = currentVal.content.sentence && currentVal.content.sentence.length > 0 && currentVal.content.sentence[0].sContent;
  exampleTranslate.innerText = currentVal.content.sentence && currentVal.content.sentence.length > 0 && currentVal.content.sentence[0].sCn;
};