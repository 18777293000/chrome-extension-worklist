var fs = require('fs');
var readline = require('readline');
var path = require('path');
var UTF8 = 'utf8';

function readFileToArr(fReadName, callback){
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
    input: fRead
  });
  var arr = new Array();
  objReadline.on('line', function(line){
    arr.push(line);
  });
  objReadline.on('close', function(){
    callback(arr);
  });
};

function makeDir(content, path){
  if(fs.existsSync(path)){
    console.log('file exits');
    fs.writeFileSync(path, '', UTF8);
  };
  fs.writeFileSync(path, content, UTF8);
};

function formatContent(value){
  const res = {
    wordRank: null,
    headWord: null,
    content: {},
  };
  res.wordRank = value.wordRank;
  res.headWord = value.headWord;
  res.content['sentence'] = value.content.word.content.sentence && value.content.word.content.sentence.sentences;
  res.content['syno'] = value.content.word.content.syno && value.content.word.content.syno.synos;
  res.content['remMethod'] = value.content.word.content.remMethod;
  res.content['trans'] = value.content.word.content.trans;
  return res;
}

readFileToArr('./KaoYanluan_1.json', (res) => {
  var result = null;
  var content = {};
  try{
    for(let i=0; i < res.length; i++){
      result = JSON.parse(res[i]);
      content[result.headWord] = formatContent(result);
    }
    
    makeDir(JSON.stringify(content, null, '\t'), './res.json');
  }catch(error){
    console.error(error);
  }
});