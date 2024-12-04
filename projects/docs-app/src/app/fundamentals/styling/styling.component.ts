import { Component } from '@angular/core';

@Component({
    selector: 'app-styling',
    templateUrl: './styling.component.html',
    styleUrls: ['./styling.component.scss'],
    standalone: false
})
export class StylingComponent {

  branchLines = `
.node-content-wrapper, .tree-children {
  position: relative;
}

.node-content-wrapper::before, .tree-children::after {
  content: "";
  position: absolute;
}

.node-content-wrapper::before {
  border-bottom: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  height: 28px;
  top: -17px;
  width: 20px;
  left: -28px;
}

.tree-node-level-1 > tree-node-wrapper > .node-wrapper > .node-content-wrapper::before {
  display: none;
}

.tree-node-leaf > .node-wrapper > .node-content-wrapper::before {
  width: 25px;
}

.tree-children::after {
  border-left: 1px solid lightgrey;
  height: 100%;
  top: -15px;
  left: -15px;
}

tree-node:last-child > .tree-node > .tree-children::after {
  border-left: none;
}

.toggle-children {
  z-index: 1;
}
`;

  pullRight = `
.tree {
  width: 300px;
}

.node-content-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.node-content-wrapper {
  flex-grow: 1;
  position: relative;
}

.pull-right {
  position: absolute;
  right: 10px;
}
`;

  ace = `
div.tree div.tree-children::before,
div.tree::before {
    content: "";
    position: absolute;
    border-left: 1px dotted #23527c;
    height: 100%;
    top: -14px;
    left: 12px
}

div.tree {
    padding-left: 0;
    margin-left: -5px
}

div.tree div.tree-children {
    position: relative;
    padding-left: 0;
    margin-left: 16px
}

div.tree div.tree-children::before {
    left: 5px
}

div.tree tree-node>div>.node-wrapper {
    margin-left: 24px
}

div.tree tree-node>div>.node-wrapper>.node-content-wrapper {
    margin-left: 4px
}

div.tree tree-node>div.tree-node-leaf>.node-wrapper {
    margin-left: 0
}

div.tree tree-node>div::before {
    content: "";
    position: absolute;
    border-bottom: 1px dotted #23527c;
    width: 7px;
    margin-top: 12px;
    left: 7px
}

div.tree tree-node>div .toggle-children-wrapper {
    width: 13px;
    height: 13px;
    border: 1px solid #23527c;
    position: absolute;
    left: 15px;
    margin-top: 5px;
    margin-left: 0;
    display: inline-block;
    background-color: #fff;
    z-index: 1
}

div.tree tree-node>div .toggle-children-wrapper::before {
    content: "";
    display: inline-block;
    width: 7px;
    border-top: 1px solid #23527c;
    position: absolute;
    top: 5px;
    left: 2px
}

div.tree tree-node>div .toggle-children-wrapper.toggle-children-wrapper-collapsed::after {
    content: "";
    display: inline-block;
    height: 7px;
    border-left: 1px solid #23527c;
    position: absolute;
    top: 2px;
    left: 5px
}

div.tree tree-node>div .toggle-children-wrapper .toggle-children {
    display: none
}

div.tree tree-node>div .node-content-wrapper {
    margin-left: 4px
}

div.tree>tree-node>div::before {
    left: 14px
}

div.tree>tree-node>div>.node-wrapper>tree-node-expander>.toggle-children-wrapper {
    left: 22px
}
`;

}
