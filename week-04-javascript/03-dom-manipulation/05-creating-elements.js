// 05 - Creating Elements Dynamically
// Open index.html. Click Add list item to see createElement and appendChild.

let itemCount = 3;
document.getElementById("btn-add-item").addEventListener("click", function () {
  itemCount++;
  // createElement + textContent + appendChild
  let li = document.createElement("li");
  li.className = "item";
  li.textContent = "Item " + itemCount + " (added dynamically)";
  document.querySelector(".item-list").appendChild(li);
  console.log("added:", li.textContent);
});

console.log("=== Creating and Removing Elements ===");
console.log("document.createElement('li')        - create in memory");
console.log("element.textContent = 'hi'          - set content");
console.log("parent.appendChild(element)         - insert into page");
console.log("element.setAttribute('data-id', '123') - set any attribute");
console.log("element.getAttribute('data-id')     - read attribute");
console.log("element.remove()                    - remove from DOM");
console.log("parent.removeChild(child)           - remove via parent");
console.log("element.closest('.card')            - find nearest ancestor matching selector");
