<template>
            <fabric-canvas ref="canvas" :height="400" :width="700">
              <!-- :width="800" -->
              <!-- Separation between Toolbox and actual Canvas -->
              <!-- TODO: width/height as params, y2 set as well -->
              
              <!-- <fabric-dot-grid v-if="settings.grid" id="fc-grid" :gridSize="10" :gridHeight="400" :gridWidth="700" /> -->
              <!-- <fabric-line id="fc-top" :x1="0" :x2="1000" :y1="0" :y2="0" stroke="#ccc" fill="#ccc" /> -->
              <!-- <fabric-line
              id="tb-border"
              :x1="250"
              :x2="250"
              :y1="0"
              :y2="1000"
              fill="#ccc"
              stroke="#ccc"
              :strokeDashArray="[5,5]"
              />-->
              <!-- ################################################################### -->
              <!-- #  Individually generated Elements                                # -->
              <!-- ################################################################### -->
              <fabric-image-from-URL
                :id="/*'el-'+*/item.a"
                :key="item.a"
                v-for="item in items"
                :url="item.url"
                :left="item.l + LEFTOFFSET"
                :top="item.t"
                :hasRotatingPoint="false"
                @modified="modified"
                @selected="onSelected"
                @deselected="onDeselected"
                @moving="onDragging"
                :select="selEl==item"

                @keyup.delete="this.console.log(item.a)"
              />
              <!-- @mouseup="modified" -->
            </fabric-canvas>

            <!-- Tooltippin -->
            <!-- v-b-hover="(hover, evt) => { el._tool.hover = hover; this.console.log(el._tool); /* toolbox_hover(hover, el)*/ }"
            :class="el._tool.hover ? 'border border-info' : 'border border-'" -->
              <!-- <b-popover :target="'tool-'+el.typ" triggers="hover" placement="top">
                <template v-slot:title>Click to add ...</template>< !-- I am popover <b>component</b> content! -- >
              </b-popover> -->
            <!-- v-b-tooltip.hover="'Tooltip!'" -->

            
            <!-- INFO: Considerations of a dropdown alternative for small viewports ...
            <b-dropdown class="d-block d-sm-none" size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
            </b-dropdown>-->

            
            <!-- TOOLBAR -- >
            <div class="mb-1">
            <b-button-toolbar key-nav aria-label="Toolbar with button groups">
              <b-button-group>< !-- <b-button>&lsaquo;&laquo;</b-button> -- >
                <b-button :pressed.sync="settings.grid" @click="this.console.log(settings.grid)" squared :variant="settings.grid ? 'primary' :'outline-muted'">&#x25A6;</b-button>
              </b-button-group>
            </b-button-toolbar>
            </div> -->

</template>

<script>


let canvasEvents = [
  // "before:render",
  // "after:render",
  // "canvas:cleared",
  // "object:added",
  // "object:removed",

  // "object:modified",
  // "object:rotated",
  // "object:scaled",
  // "object:moved",
  // "object:skewed",
  // "object:rotating",
  // "object:scaling",
  // "object:moving",
  // "object:skewing",
  // "before:transform",
  // "before:selection:cleared",
  // "selection:cleared",
  // "selection:updated",
  // "selection:created",
  // "path:created",
  // "mouse:down",
  // "mouse:move",
  // "mouse:up",
  // "mouse:down:before",
  // "mouse:move:before",
  // "mouse:up:before",
  // "mouse:over",
  // "mouse:out",
  // "mouse:dblclick",
  // "dragover",
  // "dragenter",
  // "dragleave",
  // "drop"
];

const OBJECT_EVENTS = [
  // "added",
  // "removed",
  "selected",
  "deselected",
  // "modified",
  // "moved",
  // "scaled",
  // "rotated",
  // "skewed",
  // "rotating",
  "scaling",
  "moving",
  // "skewing",
  // "mousedown",
  // "mouseup",
  // "mouseover",
  // "mouseout",
  // "mousewheel",
  // "mousedblclick",
  // "dragover",
  // "dragenter",
  // "dragleave",
  // "drop"
];


export default {
  data: function() {
    return {
      items: [
        //new BaseElement(),
        /* { a: "el-x", typ: "but00", l: 20, t: 150, w: 100, h: 40, url: "/img/ui/button.png",
          events: [{ a: "ev-1", type: "Formular senden", cond: [
                { a: "c1", type: "notempty", el: "el-a" },
                { a: "c2", type: "notempty", el: "el-b" }
              ] }] }, */
      ]
    }
  }
}
</script>