console.log('contentscript.js was run');

var html = $('html')[0].outerHTML;
html = html.toString();
//console.log('Source:'+html);
var actual = html2json(html);
//console.log('Result:'+JSON.stringify(actual));
document.write(JSON.stringify(actual));