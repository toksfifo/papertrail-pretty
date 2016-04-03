var messages = document.querySelectorAll('.event.colorized');
var eventList = document.getElementById('event_list');

if (eventList) {
  var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i]
      if (mutation.target) {
        for (var j = 0; j < mutation.target.children.length; j++) {
          var expandButton = createExpandButton();
          var listItem = mutation.target.children[j]
          listItem.insertBefore(expandButton, listItem.firstChild);
        }
      } else {
        console.log('-----------------------')
        console.log(mutation.addedNodes)
      }
    }
  })

  var config = { attributes: true, childList: true, characterData: true }

  observer.observe(eventList, config)
}

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
  expandButton.addEventListener('click', (e) => {
    expandMessage(e.target.parentNode);
  });
  return expandButton;
}

// comment
function expandMessage(messageParent) {
  var messageClass = 'message';
  var beautifyOptions = { indent_size: 2};
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