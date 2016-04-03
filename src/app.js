const buttonClass = 'pp-button';
const buttonExpandClass = 'pp-expand';
const buttonContractClass = 'pp-contract';
const buttonExpandText = '+';
const buttonContractText = '-';
const messageClass = 'message';
const hiddenClass = 'pp-hidden';
const beautifyConfig = { indent_size: 2 };
const language = 'ruby';


class ListItem {
  constructor(node) {
    this.node = node;
    this.message = null;
    this.prettyMessage = null;
    this.expandButton = null;
    this.contractButton = null;
    this.addButtons();
    this.setDefaultButtonState();
  }

  setDefaultButtonState() {
    this.expandButton.show();
    this.contractButton.hide();
  }

  addButtons() {
    this.expandButton = new ExpandButton(this.expandPretty.bind(this));
    this.contractButton = new ContractButton(this.contractPretty.bind(this));
    this.node.insertBefore(this.expandButton.node, this.node.firstChild);
    this.node.insertBefore(this.contractButton.node, this.node.firstChild);
  }

  expandPretty() {
    this.ensureMessages();
    this.message.classList.add(hiddenClass);
    this.prettyMessage.classList.remove(hiddenClass);
    this.expandButton.hide();
    this.contractButton.show();
  }

  contractPretty() {
    this.ensureMessages();
    this.message.classList.remove(hiddenClass);
    this.prettyMessage.classList.add(hiddenClass);
    this.expandButton.show();
    this.contractButton.hide();
  }

  ensureMessages() {
    if (!this.message || !this.prettyMessage) {
      this.getMessage();
      this.getPrettyMessage();
    }
  }

  getMessage() {
    for (var i = 0; i < this.node.childNodes.length; i++) {
      var child = this.node.childNodes[i];
      if (child.classList && child.classList.contains(messageClass)) {
        var message = child;
        this.message = child;
        return message;
        break;
      }
    }
    return null;
  }

  // comment
  getPrettyMessage() {
    var prettyMessage = document.createElement('pre');
    var beautifulMessage = js_beautify(this.message.innerText, beautifyConfig);
    prettyMessage.innerHTML = beautifulMessage;
    prettyMessage.classList.add(language);
    hljs.highlightBlock(prettyMessage);
    this.prettyMessage = prettyMessage;
    this.node.insertBefore(this.prettyMessage, this.message);
    return prettyMessage;
  }

}

class Button {
  constructor(text, cssClass, onClick) {
    this.node = document.createElement('button');
    this.node.innerHTML = text;
    this.node.classList.add(buttonClass);
    this.node.classList.add(cssClass);
    this.node.addEventListener('click', onClick);
  }

  show() {
    this.node.classList.remove(hiddenClass);
  }

  hide() {
    this.node.classList.add(hiddenClass);
  }
}

class ExpandButton extends Button {
  constructor(onClick) {
    super(buttonExpandText, buttonExpandClass, onClick);
  }
}

class ContractButton extends Button {
  constructor(onClick) {
    super(buttonContractText, buttonContractClass, onClick);
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
}