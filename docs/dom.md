# DOM

The **DOM (Document Object Model)** is a programming interface for HTML and XML documents. It provides a structured representation of the document and it defines a way that the structure can be manipulated from a program, usually JavaScript.

When a web page is loaded, the browser creates a Document Object Model of the page.
It's essentially a **structured, tree-like representation of the HTML elements present on the page**. Each node in the tree represents an HTML element present in the document. Through JavaScript, these nodes can be manipulated—added, changed, or deleted—to create dynamic web pages.

For example, consider the following simple html document:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head> <body>
    <div id="content">
        <h1 class="heading">Hello World!</h1>
        <p>This is my website.</p>
        <img src="my_image.jpg" alt="My Image">
    </div>
</body>
</html>
```
The corresponding DOM tree for this HTML document would look something like this:

```
Document
|_ DOCTYPE: html
|_ html
|  |_ (attribute) lang: "en"
   |_ head
   |  |_ meta
   |  |  |_ (attribute) charset: "UTF-8"
   |  |_ title
   |     |_ #text: My Website
   |_ body
      |_ div
      |  |_ (attribute) id: "content"
         |_ h1
         |  |_ (attribute) class: "heading"
         |  |_ #text: Hello World!
         |_ p
         |  |_ #text: This is my website.
         |_ img
            |_ (attribute) src: "my_image.jpg"
            |_ (attribute) alt: "My Image"
```

In this tree, every HTML element is a node. The type of node can be an **element node**, an **attribute node**, or a **text node**. Here:

* **Element nodes**: `html`, `head`, `title`, `body`, `div`, `h1`, and `p`
* **Attribute nodes**: `id`, `class`, `src` and `alt`
* **Text nodes**: `My Website`, `Hello World!`, and `This is my website`.

You can navigate this tree using various DOM methods to select, add, modify, or delete nodes. 
For example, you can select the `h1` node using the method document.querySelector('h1'), then change its text content with textContent.

The browser builds this tree-like structure from the HTML document, **and any changes to the tree immediately reflect on the rendering of the web page.** 
This is the basis of how dynamic web content works. When we use JavaScript (or a library/framework like jQuery, D3.js, React, etc.) to manipulate the DOM, you're programmatically changing this tree structure, which in turn changes what the user sees.


## Virtual DOM

The **Virtual DOM** is a core concept in React and is what gives React its performance benefits. 

In traditional JavaScript applications, when you want to change something on the page, you directly manipulate the DOM. For example, if you want to change the text in a div, you might do something like `document.getElementById('myDiv').innerText = 'New Text'`. This is straightforward, but it can be inefficient.

**The reason it can be inefficient is that changes to the DOM are expensive in terms of performance. This is because every time you make a change, the browser needs to recalculate the layout, repaint the screen, and perform other tasks to reflect that change. If you're making lots of changes in quick succession, this can significantly slow down your application.**

Now, let's introduce the Virtual DOM. The Virtual DOM is a lightweight copy of the actual DOM. It's a JavaScript object that describes what the DOM should look like. When you make changes, you're making them to the Virtual DOM, not the actual DOM.

React's Virtual DOM, on the other hand, enables React to batch multiple changes together. This means React can make multiple changes to the Virtual DOM, then calculate the difference (the "diff"), and apply all those changes to the real DOM in one operation. This reduces the amount of work the browser needs to do and can lead to better performance.

### "Batch"

For example, consider a list where you need to update every item in response to a user action. With direct DOM manipulation, you would update each item one by one, triggering a reflow or repaint each time. In contrast, React would update all items in the Virtual DOM, diff the changes, and apply them all at once to the real DOM.

### "Reconciliation"

React uses smart diffing algorithms (the reconciliation process) to minimize the number of changes it needs to apply to the real DOM. It essentially figures out the most efficient way to make these changes, reducing the amount of work the browser has to do.

Let's say we have a list of three items, displayed in an ordered list on an HTML page:

```html
<ol>
  <li id="item1">Item 1</li>
  <li id="item2">Item 2</li>
  <li id="item3">Item 3</li>
</ol>
```

Let's consider two scenarios: updating this list using traditional JavaScript DOM manipulation, and updating this list using React.

#### 1. Traditional JavaScript DOM Manipulation:

we might do something like this:

```js
let newElement = document.createElement('li');
newElement.id = 'newItem';
newElement.innerHTML = 'New Item';
let list = document.getElementsByTagName('ol')[0];
list.insertBefore(newElement, list.childNodes[0]);
```

This operation involves creating a new DOM element, finding the location in the DOM where we want to insert it, and then inserting it. However, **this operation also affects the layout of all subsequent items in the list (item1, 2 and 3), which may require the browser to perform a full recalculation of the page layout and a repaint.** In a large list, this could potentially be a costly operation.

```html
<ul>
  <li id="newItem">New Item</li>
  <li id="item1">Item 1</li>
  <li id="item2">Item 2</li>
  <li id="item3">Item 3</li>
</ul>
```

In this case, the browser sees that all the list items have been removed and new ones have been added, even though three of them are actually the same. It recalculates the layout for all of these items and repaints the entire list.

#### 2. React

On the other hand, with React's reconciliation, we're only changing the content of the existing DOM nodes and adding one new one. React knows the existing nodes haven't actually moved or changed size - only their content has changed. So, the virtual DOM after adding a new item might look like this:

```html
<ul>
  <li id="item1">New Item</li>
  <li id="item2">Item 1</li>
  <li id="item3">Item 2</li>
  <li id="newNode">Item 3</li>
</ul>
```

When these changes are applied to the actual DOM, **the browser only has to recalculate the layout for the new item (`newNode`), not for the existing ones.** It still repaints the parts of the screen where changes have happened, but there are **fewer layout calculations to perform**.

From a pure HTML perspective, there is no difference in complexity between the two new structures. Both have the same number of elements and similar properties.
The real difference lies in the way the changes are made and how the browser interprets them:

1. In the traditional JavaScript approach, you're inserting a new `<li>` element at the beginning of the list. This is a modification to the existing structure of the DOM, and so the browser treats it as such. The browser needs to recompute the layout of all subsequent elements in the list because their position might be affected by this new element. Also, any JavaScript or CSS that directly references the id values of those elements might behave differently now that a new item with a new id is in the list.
2. In the React approach, you're reusing existing DOM nodes where possible. React is just changing the inner content of the existing `<li>` elements (this is much less expensive operation), and only the last one is a totally new node. The browser doesn't have to recompute the layout of existing DOM elements, as their structure remains the same; it only needs to paint the new text inside these elements and deal with the new node at the end of the list. In terms of the `id` attribute, **in a well-designed React application, these would not typically be used in a way that is affected by the change in the list's order or content. The JavaScript and CSS used in a React application are designed to work with React's way of managing the DOM and therefore should not be affected by such changes.**

