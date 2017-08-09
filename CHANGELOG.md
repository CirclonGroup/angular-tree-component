<a name="4.1.0"></a>
# 4.1.0 (2017-XX-XX)
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
