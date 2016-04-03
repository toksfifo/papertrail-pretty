'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var buttonExpand = 'expand';
var buttonContract = 'contract';
var messageClass = 'message';
var beautifyConfig = { indent_size: 2 };
var language = 'ruby';

var ListItem = function () {
  function ListItem(node) {
    _classCallCheck(this, ListItem);

    this.node = node;
  }

  _createClass(ListItem, [{
    key: 'addButton',
    value: function addButton() {
      var button = new Button(buttonExpand, this.expand.bind(this));
      this.node.insertBefore(button.node, this.node.firstChild);
    }

    // comment event

  }, {
    key: 'expand',
    value: function expand(event) {
      var message = this.getMessage();
      // if this.message
      var prettyMessage = this.getPrettyMessage(message);
      this.node.replaceChild(prettyMessage, message);
    }
  }, {
    key: 'getMessage',
    value: function getMessage() {
      for (var i = 0; i < this.node.childNodes.length; i++) {
        var child = this.node.childNodes[i];
        console.log(child);
        if (child.classList && child.classList.contains(messageClass)) {
          return child;
          break;
        }
      }
      return null;
    }

    // comment

  }, {
    key: 'getPrettyMessage',
    value: function getPrettyMessage(message) {
      var prettyMessage = document.createElement('pre');
      var beautifulMessage = js_beautify(message.innerText, beautifyConfig);
      prettyMessage.innerHTML = beautifulMessage;
      prettyMessage.classList.add(language);
      hljs.highlightBlock(prettyMessage);
      return prettyMessage;
    }
  }]);

  return ListItem;
}();

var Button = function Button(type, onClick) {
  _classCallCheck(this, Button);

  this.type = type;
  this.node = document.createElement('button');
  this.node.innerHTML = '+';
  this.node.classList.add(buttonExpand);
  this.node.addEventListener('click', onClick);
};

var listItems = document.querySelectorAll('.event.colorized');
var eventList = document.getElementById('event_list');

// if (eventList) {
//   var observer = new MutationObserver((mutations) => {
//     for (var i = 0; i < mutations.length; i++) {
//       var mutation = mutations[i];
//       var newNodes = mutation.addedNodes;
//       if (newNodes && newNodes.length > 0) {
//         for (var j = 0; j < newNodes.length; j++) {
//           var listItem = newNodes[j]
//           if (listItem.nodeName !== 'LI') {
//             continue;
//           }
//           var expandButton = createExpandButton();
//           // if doesn't already have button
//           listItem.insertBefore(expandButton, listItem.firstChild);
//         }
//       }
//     }
//   });

//   var config = { childList: true }

//   observer.observe(eventList, config)
// }

// for (var i = 0; i < listItems.length; i++) {
//   var listItem = listItems[i];
//   var expandButton = createExpandButton();
//   listItem.insertBefore(expandButton, listItem.firstChild);
// }

for (var i = 0; i < listItems.length; i++) {
  var listItem = new ListItem(listItems[i]);
  listItem.addButton();
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

  // Message is already expanded
  if (!message) {
    return;
  }

  // Replace message
  var newMessage = document.createElement('pre');
  var beautifulMessage = js_beautify(message.innerText, beautifyOptions);
  newMessage.innerHTML = beautifulMessage;
  messageParent.replaceChild(newMessage, message);

  // Highlight
  newMessage.className += ' ruby';
  hljs.highlightBlock(newMessage);
}