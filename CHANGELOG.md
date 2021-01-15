<a name="10.0.2"></a>
# 10.0.2 (2020-12-21)

### Bug Fixes

* update lodash-es ([#862](https://github.com/CirclonGroup/angular-tree-component/issues/862)) ([22e0d85](https://github.com/CirclonGroup/angular-tree-component/commit/22e0d85)), closes ([#862](https://github.com/CirclonGroup/angular-tree-component/issues/862))

<a name="10.0.1"></a>
# 10.0.1 (2020-12-11)

### Bug Fixes

* do not load whole child collection with virtual scroll ([#463](https://github.com/CirclonGroup/angular-tree-component/issues/463)) ([a62fc73](https://github.com/CirclonGroup/angular-tree-component/commit/a62fc73))

<a name="10.0.0"></a>
# 10.0.0 (2020-07-29)

### Code Refactoring

* remove unused polyfill ([#847](https://github.com/CirclonGroup/angular-tree-component/issues/847)) ([5a1a14e](https://github.com/CirclonGroup/angular-tree-component/commit/5a1a14e)), closes ([#847](https://github.com/CirclonGroup/angular-tree-component/issues/847))

<a name="10.0.0-beta.0"></a>
# 10.0.0-beta.0 (2020-07-22)

### Features

* Update to Angular 10 ([5338eb4](https://github.com/CirclonGroup/angular-tree-component/commit/5338eb4))

### BREAKING CHANGES

BEFORE:

No minimum Angular version set

AFTER:

Angular v10 minimum dependencies

<a name="9.0.3"></a>
# 9.0.3 (2020-07-20)

### Build

* add license to library package.json ([#843](https://github.com/CirclonGroup/angular-tree-component/issues/843)) ([23476c8](https://github.com/CirclonGroup/angular-tree-component/commit/23476c8)), closes ([#843](https://github.com/CirclonGroup/angular-tree-component/issues/843))

<a name="9.0.2"></a>
# 9.0.2 (2020-07-15)

### Bug Fixes

* include mobx as dependency ([a96f2bc](https://github.com/CirclonGroup/angular-tree-component/commit/a96f2bc))

<a name="9.0.1"></a>
# 9.0.1 (2020-07-15)

### BREAKING CHANGES

* move to new npm package scope

BEFORE:

package.json:

```
"dependencies": {
    ...
    "angular-tree-component": "^8.5.6",
    ...
}
```

AFTER:

package.json

```
"dependencies": {
    ...
    "@circlon/angular-tree-component": "^9.0.1",
    ...
}
```

* move css file to css folder instead of dist

BEFORE:

Import angular tree css:

```
@import '~angular-tree-component/dist/angular-tree-component.css';
```

AFTER:

package.json

```
@import '~@circlon/angular-tree-component/css/angular-tree-component.css';
```

<a name="9.0.0"></a>
# 9.0.0 (2020-07-10)

### Bug Fixes

* Use correct ITreeOptions input in TreeComponent instead of TreeOptions ([#795](https://github.com/CirclonGroup/angular-tree-component/issues/795)) ([62f0c02](https://github.com/CirclonGroup/angular-tree-component/commit/62f0c02)), closes ([#795](https://github.com/CirclonGroup/angular-tree-component/issues/795))

### Features

* Update to Angular 9 ([37feac56](https://github.com/CirclonGroup/angular-tree-component/commit/37feac56))

### Code Refactoring

* use on example app and move app to projects ([5ded257](https://github.com/CirclonGroup/angular-tree-component/commit/5ded257))
* move library to projects and use ng-packagr for build ([a04ea64](https://github.com/CirclonGroup/angular-tree-component/commit/a04ea64))

### BREAKING CHANGES

* Provide TreeDraggedElement in root ([50dee1b](https://github.com/CirclonGroup/angular-tree-component/commit/50dee1b))

BEFORE:

Import TreeModule with `TreeModule.forRoot()` in base module.

```
@NgModule({
  imports: [
    TreeModule.forRoot()
  ]
})
export class MyModule {}
```

AFTER:

Import TreeModule with `TreeModule` in all modules.

```
@NgModule({
  imports: [
    TreeModule
  ]
})
export class MyModule {}
```

<a name="8.5.6"></a>
# 8.5.6 (2020-14-02)
* Fixed mobxAutorun to treeMobxAutorun

<a name="8.5.5"></a>
# 8.5.5 (2020-14-02)
* Support Angular 9 by removing dependency to mobx-angular (copied code inside)

<a name="8.5.4"></a>
# 8.5.4 (2020-12-02)
* Support Angular 9 by upgrading mobx-angular to 3.1.1

<a name="8.5.2"></a>
# 8.5.2 (2019-03-12)
* Fixed computed value after updating model, because parent was null and we got a race-condition

<a name="8.5.1"></a>
# 8.5.1 (2019-07-11)
* Changed options input to ITreeOptions

<a name="8.5.0"></a>
# 8.5.0 (2019-06-11)
* Support IVY by removing transitive dependency on Renderer via mobx-angular

<a name="8.4.1"></a>
# 8.4.1 (2019-01-10)
* Exporting TreeNodeWrapperComponent and TreeAnimateOpenDirective from main module
* Added openCollective message post install

<a name="8.4.0"></a>
# 8.4.0 (2019-19-05)
* Added 'from' node on moveNode event

<a name="8.3.0"></a>
# 8.3.0 (2019-22-02)
* Extended selection-api for nodes
* Setting option scrollOnActivate to true did not prevent scrolling when clicking a node

<a name="8.2.1"></a>
# 8.2.1 (2019-21-02)
* Moved @types/lodash to devDeps

<a name="8.2.0"></a>
# 8.2.0 (2018-29-12)
* Added allowDragoverStyling option

<a name="8.1.0"></a>
# 8.1.0 (2018-25-12)
* Added public calculateExpandedNodes
* Fixed loading async children in large tree

<a name="8.0.5"></a>
# 8.0.5 (2018-25-12)
* Fixed non triState checkboxes to reflect expected behaviour

<a name="8.0.4"></a>
# 8.0.4 (2018-22-12)
* Fixed non triState checkboxes
* Fixed checkboxes example to switch expander and checkbox

<a name="8.0.3"></a>
# 8.0.3 (2018-20-12)
* Fixed Warning on state bind

<a name="8.0.2"></a>
# 8.0.2 (2018-11-12)
* Checkbox keep parent selection on async childs

<a name="8.0.1"></a>
# 8.0.1 (2018-04-12)
* Unsubscribe to prevent memory leaks

<a name="8.0.0"></a>
# 8.0.0 (2018-04-08)
* Breaking change - Upgrade to Angular6 and Renderer2
* Breaking change - load TreeDraggedElement in forRoot to support lazy loading

<a name="7.2.1"></a>
# 7.2.1 (2018-21-06)
* remove _canMoveNode validation from the copyNode function, fix #608 - PR #609
* Add event parameter to onScroll, fix #534 #537 - PR #537
* Optimize onChanges update, fix #534 #537 - PR #537
* Fixed example with Angular6
* Moved @lodash/types from devDependency to dependency

<a name="7.2.0"></a>
# 7.2.0 (2018-14-05)
* Added nodeActivate and nodeDeactivate events for IE11 - issue #387
* Added scrollContainer option to allow scrolling in external container - issue #92

<a name="7.1.0"></a>
# 7.1.0 (2018-24-03)
* Breaking change - Renamed SELECT action to ACTIVATE
* Breaking change - Renamed DESELECT action to DEACTIVATE
* Added SELECT and DESLECT that do selection instead of activation
* Breaking change - renamed scrollOnSelect to scrollOnActivate
* Fixed setHiddenNodesIds with correct reduce order
* Added useTriState to options to decide if using master checkboxes or not
* Fixed memory leak - disposing of reactions
* Added useTriState option
* Fixed master checkbox to only select visible children
* Improving scroll performance
* Added mobile drag and drop polyfill

<a name="7.0.2"></a>
# 7.0.2 (2018-13-03)
* Load specific lodash modules
* Fix mobx and mobx-angular versions

<a name="7.0.1"></a>
# 7.0.1 (2017-15-12)
* Fixed typescript 2.6.1 strict checking

<a name="7.0.0"></a>
# 7.0.0 (2017-14-12)
* Added checkbox support with useCheckbox
* Added selection support in models (used by checkbox)
* Breaking Change - renamed TOGGLE_SELECTED_* actions to TOGGLE_ACTIVE_*, and added TOGGLE_SELECTED for checkboxes
* Fixed key navigation when filtered

<a name="6.1.0"></a>
# 6.1.0 (2017-08-12)
* Allow dropslot = 0
* Fixed change detection
* Added hasChildrenField

<a name="6.0.0"></a>
# 6.0.0 (2017-25-11)
* Breaking change - not returning promise anymore for setIdExpanded
* Fixed restore state for async children
* Returned sizeChanged method

<a name="5.2.1"></a>
# 5.2.1 (2017-15-11)
* Fixing for Angular Universal
* Fixing MobX index out of bounds

<a name="5.2.0"></a>
# 5.2.0 (2017-15-11)
* Angular 5

<a name="5.1.0"></a>
* Removing dependencies from UMD bundle
* Passing custom id to virtualRoot node

<a name="5.0.0"></a>
# 5.0.0 (2017-01-09)
* Breaking change - Moved styles to external CSS
* Breaking change - Renamed tree class to angular-tree-component
* Added rtl option

<a name="4.1.0"></a>
# 4.1.0 (2017-03-08)
* Fixed changeFilterr typo
* Added copyNode on ctrl

<a name="4.0.0"></a>
# 4.0.0 (2017-29-07)
* Breaking change - Renamed loadChildren to loadNodeChildren because of AoT
* Breaking change - removed deprecated event names onXXX
* Breaking change - removed deprecated component names
* Fixed bug for Angular Universal
* added 'drag' action mapping

<a name="3.9.0"></a>
# 3.9.0 (2017-28-07)
* Added setHiddenNodeIds
* Added state 2 way binding
* Removed isHiddenField

<a name="3.8.0"></a>
# 3.8.0 (2017-15-07)
* Added scrollOnFocus
* Added RTL example

<a name="3.7.3"></a>
# 3.7.3 (2017-08-06)
* Prevent overwriting existing node ids to allow use with immutable objects
* Fix MobX version to support AoT

<a name="3.7.2"></a>
# 3.7.2 (2017-21-05)
* Fixed close / open quickly when animating

<a name="3.7.1"></a>
# 3.7.1 (2017-21-05)
* Fixed allowDrop

<a name="3.7.0"></a>
# 3.7.0 (2017-20-05)
* Firing onInitialized after viewport set
* Rename events - "onXXX" => "XXX"
* Added 'dropOnNode' to event when dropping directly on node

<a name="3.6.0"></a>
# 3.6.0 (2017-10-05)
* added drag over / leave / enter / end to action mapping
* added $event to allowDrop function
* Allow for node ID=0

<a name="3.5.0"></a>
# 3.5.0 (2017-29-04)
* doForAll allows promises (supports expandAll of async nodes)

<a name="3.4.1"></a>
# 3.4.1 (2017-29-04)
* Fixed SystemJS errors

<a name="3.4.0"></a>
# 3.4.0 (2017-28-04)
* Add animations
* Add node wrapper template
* Fixed drop slot style

<a name="3.3.1"></a>
# 3.3.1 (2017-19-04)
* Support useStrict mode in MobX

<a name="3.3.0"></a>
# 3.3.0 (2017-17-04)
* Reduce bundle size
* Fix tree not rendered when hidden then shown
* Update to mobx-angular

<a name="3.2.4"></a>
# 3.2.4 (2017-04-04)
* Support Angular 4
* Fixed tree-node and tree-node-level-X classes.
* Removed redundant div in children
* Added integration tests
* Passing node in context to loading template
* Fixed using treeNodeFullTemplate
* Added more demos
* Fixed filtering without virtual scroll option
* allowDrag allows functions
* Drag and drop fix for IE9+
* Fixed doForAll to run recursively

<a name="3.2.3"></a>
# 3.2.3 (2017-03-08)
* Fixed bug when actionMapping is undefined

<a name="3.2.2"></a>
# 3.2.2 (2017-03-08)
* Include mobx and lodash inside UMD bundle

<a name="3.2.1"></a>
# 3.2.1 (2017-03-07)
* Updated api and docs
* Not showing virtual scroll unless enabled
* Added treeModel to events
* Fixed getActiveNodes & getExpandedNodes

<a name="3.2.0"></a>
# 3.2.0 (2017-03-06)
* Renamed library to angular-tree-component

<a name="3.1.0"></a>
# 3.1.0 (2017-02-27)
* Changed component selectors to kebab-case

<a name="3.0.2"></a>
# 3.0.2 (2017-02-25)
* Using ng2-mobx's wrappers for observable and computed for AoT

<a name="3.0.1"></a>
# 3.0.1 (2017-02-25)
* Fix lint errors
* Fix ng2-mobx version

<a name="3.0.0"></a>
# 3.0.0 (2017-02-25)
* Virtual Scroll
* Added onChangeFilter event
* Added onLoadChildren event
* Added doForAll method on TreeModel and TreeNode
* Added expandAll method on TreeModel and TreeNode
* Added collapseAll method on TreeModel and TreeNode
* Breaking change - onToggleExpanded is called immediately after expanding node. If there are async children - onLoadChildren will be called after they are loaded.
* Breaking change - TreeModel filter function autoShow param now defaults to true
* Breaking change - Removed filter function on TreeNode
* Breaking change - Removed deprecations:
    * options.hasCustomContextMenu
    * options.context
    * options.loadingComponent
    * options.treeNodeTemplate
    * options.actionMapping.mouse.shift
    * options.actionMapping.mouse.ctrl
    * options.actionMapping.mouse.alt
    * TREE_EVENTS.onToggle
    * TREE_EVENTS.onDoubleClick
    * TREE_EVENTS.onContextMenu

<a name="2.8.2"></a>
# 2.8.2 (2017-02-21)
* Added yarn file
* Fixed lint errors
* Not mandatory to supply getChildren method
* Calling 'closest' using invokeElementMethod
* Removed onActiveChanged method
* Added 3rd party licenses

<a name="2.8.1"></a>
# 2.8.1 (2017-02-09)
* Added UMD bundle

<a name="2.8.0"></a>
# 2.8.0 (2017-02-03)
* Fixing AOT
* Fixing Core-JS
* Fixing drag on firefox
* Fixing getNodeByPath with custom idField
* Fixing Universal by calling invokeMethod
* Fixing TS errors by not setting an existing method

<a name="2.7.0"></a>
# 2.7.0 (2017-01-05)
* Promise based expand

<a name="2.6.1"></a>
# 2.6.1 (2017-01-03)
* Added drop slot for empty tree

<a name="2.6.0"></a>
# 2.6.0 (2017-01-01)
* Added index to node content template
* Added nodeClass option

<a name="2.5.1"></a>
# 2.5.1 (2016-12-21)
* Updated PeerDeps to allow for Angular 2.3

<a name="2.5.0"></a>
# 2.5.0 (2016-12-01)
* Added treeAllowDrop to treeDrop directive
* Added option allowDrop

<a name="2.4.0"></a>
# 2.4.0 (2016-11-28)
* Added levelPadding option
* Fix bug - async children isExpanded field is taken into account

<a name="2.3.0"></a>
# 2.3.0 (2016-11-28)
* Breaking change - changed drop action from parameter, to be just the node, without parent & index
* Breaking change - changed moveNode API to accept just the node, without parent & index
* Breaking change - changed onMoveNode event to include the original nodes instead of TreeNode

<a name="2.2.0"></a>
# 2.2.0 (2016-11-27)
* Allow drag between trees
* Made treeDrop directive for dragging outside tree
* Made treeDrag directive for dragging external elements into the tree

<a name="2.1.0"></a>
# 2.1.0 (2016-11-24)
* Added AoT metadata
* Added CLI example
* Fixed alignment of childless nodes. Again.

<a name="2.0.1"></a>
# 2.0.1 (2016-11-24)
* Fixed alignment of childless nodes

<a name="2.0.0"></a>
# 2.0.0 (2016-11-23)
* Allow to change options object and immediately affect tree.
* Breaking CSS change: added node-wrapper to HTML. Should only have an affect if you added custom CSS.

<a name="1.3.6"></a>
# 1.3.6 (2016-11-15)
* Added onToggleExpanded Output
* Fixed example in Firefox and IE (console.log)

<a name="1.3.5"></a>
# 1.3.5 (2016-10-19)
* Exporting Tree Component

<a name="1.3.4"></a>
# 1.3.4 (2016-10-18)
* Ignore version

<a name="1.3.3"></a>
# 1.3.3 (2016-10-15)
* Bug fix #73 - check nodes hierarchy before moving node
* Bug fix #71 - added onMoveNode as @Output
* Bug fix #67 - ignoring hidden nodes when navigating the tree using keyboard

<a name="1.3.2"></a>
# 1.3.2 (2016-10-04)
* Fixed bug dragging node to itself

<a name="1.3.0"></a>
# 1.3.0 (2016-10-04)
* Added Drag & Drop functionality using allowDrag option

<a name="1.2.2"></a>
# 1.2.2 (2016-09-24)
* Returning this in all action methods on node to allow chaining
* Fixed Activated / Deactivated events
* Added autoShow to filter
* Added setActiveAndVisible

<a name="1.2.1"></a>
# 1.2.1 (2016-09-21)
* align leaves with siblings that have children

<a name="1.2.0"></a>
# 1.2.0 (2016-09-14)
* rc.7
* support ngModule
* Using ng2 templates instead of passing them in options

<a name="1.1.18"></a>
# 1.1.18 (2016-09-11)
* Added isHidden field
* Added filterNodes function

<a name="1.1.17"></a>
# 1.1.17 (2016-09-10)
* Unused version - please use 1.1.18

<a name="1.1.16"></a>
# 1.1.16 (2016-08-15)
* Handling empty nodes
* Rename onToggle to onToggleExpanded
* Added onEvent
* Not trigerring key actions when input is focused
* Removed shift, ctrl and alt from action mappings

<a name="1.1.15"></a>
# 1.1.15 (2016-08-14)
* Fixed expander not turning on expand

<a name="1.1.14"></a>
# 1.1.14 (2016-08-11)
* Widen expander click area (#24)
* Not using deprecated methods (#24)
* Fixed bug when running update() after async children were loaded
* Setting focus on tree on all mouse actions

<a name="1.1.13"></a>
# 1.1.13 (2016-08-06)
* Added action mappings (#19)
* Moved typings to dependency (#13)

<a name="1.1.12"></a>
# 1.1.12 (2016-08-06)
* Fixed update() re-expanding nodes marked with isExpanded field

<a name="1.1.11"></a>
# 1.1.11 (2016-08-06)
* Added update() method to allow changing tree structure (add / remove nodes)

<a name="1.1.10"></a>
# 1.1.10 (2016-07-17)
* Added context to options, to use in custom template component

<a name="1.1.9"></a>
# 1.1.9 (2016-07-13)
* Fixed IE support
* Supporting 'expanded' field on node for pre-expanded nodes

<a name="1.1.8"></a>
# 1.1.8 (2016-06-30)
* Using View Encapsulation = None to allow override of CSS
* Update to Angular2 Rc3

<a name="1.1.7"></a>
# unpublished version

<a name="1.1.6"></a>
# 1.1.6 (2016-06-18)
* Fixed key navigation bug
* Update to Angular2 Rc2

<a name="1.1.5"></a>
# 1.1.5 (2016-06-17)
* Fixed loading with SystemJS & webpack
