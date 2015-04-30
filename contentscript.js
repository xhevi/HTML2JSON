var html = $('html')[0].outerHTML;
html = html.toString();
//console.log('Source:'+html);
var actual = html2json(html);
//console.log('Result:'+JSON.stringify(actual));
document.write('<pre>'+JSON.stringify(actual, null, 2)+'</pre>');