const buttonExpand = 'expand';
const buttonContract = 'contract';
const messageClass = 'message';
const beautifyConfig = { indent_size: 2 };
const language = 'ruby';

class ListItem {
  constructor(node) {
    this.node = node;
  }

  addButton() {
    var button = new Button(buttonExpand, this.expand.bind(this));
    this.node.insertBefore(button.node, this.node.firstChild);
  }

  // comment event
  expand(event) {
    var message = this.getMessage();
    // if this.message
    var prettyMessage = this.getPrettyMessage(message);
    this.node.replaceChild(prettyMessage, message);
  }

  getMessage() {
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
  getPrettyMessage(message) {
    var prettyMessage = document.createElement('pre');
    var beautifulMessage = js_beautify(message.innerText, beautifyConfig);
    prettyMessage.innerHTML = beautifulMessage;
    prettyMessage.classList.add(language);
    hljs.highlightBlock(prettyMessage);
    return prettyMessage;
  }

}

class Button {
  constructor(type, onClick) {
    this.type = type;
    this.node = document.createElement('button');
    this.node.innerHTML = '+';
    this.node.classList.add(buttonExpand);
    this.node.addEventListener('click', onClick);
  }
}




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