'use strict';

console.log("loaded extension");
// var googleSearch = document.querySelector('input[value="Google Search"]').value = "Papertrail Pretty";
// var body = document.querySelector('body').innerHTML;
// console.log(body);

// // highlighter.js
// hljs.configure({
//   useBr: true
// });

// var blocks = document.querySelectorAll('span.message');
// for (var i = 0; i < blocks.length; i++) {
//   var block = blocks[i];

//   // highlighter.js
//   // block.className += ' ruby';
//   // hljs.highlightBlock(block);

//   // syntaxhighlighter
//   // changes:
//   // white-space: pre => white-space pre-wrap
//   // font-family: monaco, monospace, courier, 'courier new', 'Bitstream Vera Sans Mono'
//   // font-weight bold => normal
//   // line-height: 1.1em => 1.3em
//   // var newBlock = document.createElement('pre');
//   // newBlock.className += ' brush: ruby';
//   // newBlock.innerHTML = block.innerHTML;
//   // block.parentNode.replaceChild(newBlock, block);

//   // code-prettify
//   // var newBlock = document.createElement('pre');
//   // newBlock.className += ' prettyprint';
//   // newBlock.innerHTML = block.innerHTML;
//   // block.parentNode.replaceChild(newBlock, block);

//   // beautify
//   var newBlock = document.createElement('pre');
//   var beautiful = js_beautify(block.innerText, { indent_size: 2 });
//   newBlock.innerHTML = beautiful
//   block.parentNode.replaceChild(newBlock, block);

//   // newBlock.className += ' brush: ruby';
//   newBlock.className += ' prettyprint';
// }

var messages = document.querySelectorAll('.event.colorized');

for (var i = 0; i < messages.length; i++) {
  var message = messages[i];
  var expandButton = createExpandButton();
  message.insertBefore(expandButton, message.firstChild);
}

// comment
function createExpandButton() {
  var expandButton = document.createElement('button');
  expandButton.innerHTML = '+';
  expandButton.className += ' expand';
  expandButton.addEventListener('click', function (e) {
    expandMessage(e.target.parentNode);
  });
  return expandButton;
}

// comment
function expandMessage(messageParent) {
  var messageClass = 'message';
  var beautifyOptions = { indent_size: 2 };
  var message;

  // Get message
  for (var i = 0; i < messageParent.childNodes.length; i++) {
    var child = messageParent.childNodes[i];
    if (child.className && child.className.indexOf(messageClass) > -1) {
      message = child;
      break;
    }
  }

  // Replace message
  var newMessage = document.createElement('pre');
  var beautifulMessage = js_beautify(message.innerText, beautifyOptions);
  newMessage.innerHTML = beautifulMessage;
  messageParent.replaceChild(newMessage, message);
}