/* This will just print the tree in HTML
function htmlTree(obj){
    var obj = obj || document.getElementsByTagName('html')[0];
    var str = "<ul><li>" + obj.tagName +"<ul>";
    $(obj.attributes).each(function(index, attribute) {
	  str += "<li>"+attribute.nodeName+"="+attribute.nodeValue+"</li>";
	});
	if (obj.textContent && obj.nodeName != "BODY" && obj.nodeName != "HTML" && obj.nodeName != "HEAD") {
		str += "<li>content=" + obj.textContent +"</li>";
	}
	str += "</ul>";
    if (obj.hasChildNodes()) {
      var child = obj.firstChild;
      while (child) {
        if (child.nodeType === 1) {
          str += htmlTree(child)
        }
        child = child.nextSibling;
      }
    }
    str += "</li></ul>";
    return str;
}
*/

var DOMArray = {};

function DOMTree(obj, arr){
    var obj = obj || document.getElementsByTagName('html')[0];
    arr[obj.tagName] = {};
    if (obj.attributes.length > 0) {	
    	$(obj.attributes).each(function(index, attribute) {
	  		arr[obj.tagName][attribute.nodeName] = attribute.nodeValue;
		});	
    }
	if (obj.textContent && obj.nodeName != "BODY" && obj.nodeName != "HTML" && obj.nodeName != "HEAD") {
		arr[obj.tagName]["content"] = obj.textContent;
	}
    if (obj.hasChildNodes()) {
      var child = obj.firstChild;
      while (child) {
        if (child.nodeType === 1) {
          DOMTree(child, arr[obj.tagName]);
        }
        child = child.nextSibling;
      }
    }
    return arr;
}


function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "&emsp;&emsp;";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
	 for(var item in arr) {
	  var value = arr[item];
	 
	  if(typeof(value) == 'object') { //If it is an array,
	   dumped_text += level_padding + "'" + item + "'<br/>";
	   dumped_text += dump(value,level+1);
	  } else {
	   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"<br/>";
	  }
	 }
	} else { //Stings/Chars/Numbers etc.
	 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
} 

//DOMTree();
console.log(JSON.stringify(DOMTree(false, DOMArray)));
document.write(dump(DOMArray));