[![Build Status](https://travis-ci.org/500tech/angular-tree-component.svg?branch=master)](https://travis-ci.org/500tech/angular-tree-component)
[![npm version](https://badge.fury.io/js/angular-tree-component.svg)](https://badge.fury.io/js/angular-tree-component)

# angular tree component

## A full featured tree component for Angular (2 and above, including 4)
We've built so many projects that required a tree component, and could never find a library that supported all features.
And building your own tree component is not an easy task.

So, we decided to build one for Angular, with all the features you can think of:
* Simple to use
* Well Documented
* Customizable & Extensible (override field names, custom templates, etc...)
* Keyboard navigation
* Async data
* Drag & Drop
* Select & Multiselect
* Filtering
* Virtual Scrolling
* Save & restore tree state
* Event callbacks
* API for accessing & altering the tree state
* Easily styled (comes with very minimal styling)

## Angular supported version
angular-tree-component supports angular 2.X.X releases, 4.X.X releases, and AoT compilation.

## Getting started
Please refer to the full documentation:  
[https://angular2-tree.readme.io/docs](https://angular2-tree.readme.io/docs)

## Demo
You can find working demos inside the docs:
[https://angular2-tree.readme.io/docs](https://angular2-tree.readme.io/docs)

## Call for styles
Hello users & contributors of the tree.

We're looking for nice example themes for the tree.
If you've made one, and are willing to share, please open an issue and attach your CSS and image of how it should look.

Thanks

## Example
To run the example:
```
git clone https://github.com/500tech/angular-tree-component

cd angular-tree-component/example/cli
npm install
npm install -g angular-cli
ng serve
```

## SystemJS
Sorry guys, SystemJS is not supported.
Modern web applications use bundlers like Webpack.

We've tried to support SystemJS for a year, but it just causes too many issues.

## What's next
We would always love to hear suggestions for features & improvements - just open an issue.

Some things on our mind down the road:
* Context menu
* Checkbox & master checkbox support
* Refactor drag & drop
* Add more tests
* Add more examples

## Contributing
run `npm run example:cli` and open [localhost:4200](http://localhost:4200) to test your code before submitting a pull request.  
Windows users - if it doesn't work try `npm run example:cli:win`.  

Please check the issues / project before starting to work on a feature / bug to make sure it's not already in progress.
