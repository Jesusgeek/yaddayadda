<template>
<layout name="LayoutDefault">
<b-container>
<b-row no-body>

  <b-col cols="3">

    <!-- TOOLBOX -->
    <b-card title="Toolbox" class="d-none d-sm-block" style="/*width:300px*/"><hr>
      <div v-for="el in ELEMENTS" :key="el.typ" class="d-flex mb-3 bd-highlight">
        <b-img :id="'tool-'+el.typ" :src="el.url" @click="toolbox_add(el)" />
          <!-- v-b-hover="(hover, evt) => { el._tool.hover = hover; this.console.log(el._tool); /* toolbox_hover(hover, el)*/ }"
          :class="el._tool.hover ? 'border border-info' : 'border border-'" -->
            <!-- <b-popover :target="'tool-'+el.typ" triggers="hover" placement="top">
              <template v-slot:title>Click to add ...</template>< !-- I am popover <b>component</b> content! -- >
            </b-popover> -->
          <!-- v-b-tooltip.hover="'Tooltip!'" -->
      </div>
    </b-card>

    <!-- INFO: Considerations of a dropdown alternative for small viewports ...
    <b-dropdown class="d-block d-sm-none" size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
    </b-dropdown>-->

  </b-col>
  <b-col cols="9">

    <!-- TOOLBAR -- >
    <div class="mb-1">
    <b-button-toolbar key-nav aria-label="Toolbar with button groups">
      <b-button-group>< !-- <b-button>&lsaquo;&laquo;</b-button> -- >
        <b-button :pressed.sync="settings.grid" @click="this.console.log(settings.grid)" squared :variant="settings.grid ? 'primary' :'outline-muted'">&#x25A6;</b-button>
      </b-button-group>
    </b-button-toolbar>
    </div> -->

    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <b-card no-body>
      <div class="mx-auto d-block p-0 m-0">
      <canvas id="can" :width="canX" :height="canY" style="background-color:#7799FF11" class="p-0 m-0" />
      </div>
    </b-card>

    <!-- Save / Reset -->
    <b-button @click="persist" :variant="itemsSaved ? 'success' : 'outline-success'" class="mt-3">
      {{itemsSaved ? "Saved" : "Save changes?"}}
    </b-button>
    <b-button @click="items=[]" variant="outline-danger" class="mt-3 ml-3">Reset</b-button>

  </b-col>

</b-row>
<b-row v-if="selEl">
        <b-col>
          <!-- <b-card no-body id="propScreen" v-if="selEl" style="/*display:flex;* / margin-top:20px;*/"> -->
          <!-- ################################################################### -->
          <!-- #  Events                                                         # -->
          <!-- ################################################################### -->
          <b-card class="events" title="Events">
            <!-- <h3>Events</h3> -->
            <!-- Select new event -->
            <!-- TODO EV: Possibly use b-form-select(s) ... -->
            <b-select v-model="selectedNewEvent" size="sm" class="mt-3">
              <!-- @change="eventAdd" -->
              <!-- <b-form-select v-model="selected" @change="this.console.log($event)"> -->
              <option :value="-1" v-if="selectedNewEvent == -1">Add new event ...</option>
              <option :value="-1" v-else>Cancel adding event!</option>
              <option v-for="(event, key) in this.EVENTTYPES" :key="key" :value="key">{{event.desc}}</option>
              <!-- <option>On Click</option>
              <option>On Doubleclick</option>-->
              <!-- <v-option v-for="item of monthoptions" :value="item" @click="gotoMonth(item)">{{item}}</v-option> -->
            </b-select>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
            <!-- <div class="mt-3">Element Count: <strong>{{ items.length }}</strong></div> -->
            <!-- Select new action -->
            <b-select
              v-if="selectedNewEvent != -1"
              v-model="selectedAction"
              @change="eventAdd"
              size="sm"
              class="mt-3"
            >
              <!-- <b-form-select v-model="selected" @change="this.console.log($event)"> -->
              <option :value="-1">Select action ...</option>
              <!-- <option :value="-1" v-else>Cancel adding action ...</option> -->
              <option
                v-for="(action, key) in this.ACTIONTYPES"
                :key="key"
                :value="key"
              >{{action.desc}}</option>
              <!-- <option v-for="(event, key) in this.EVENTTYPES" :key="key" :value="key">{{event.desc}}</option> -->
              <!-- <option>On Click</option>
              <option>On Doubleclick</option>-->
              <!-- <v-option v-for="item of monthoptions" :value="item" @click="gotoMonth(item)">{{item}}</v-option> -->
            </b-select>
            <!-- <v-select :options="['Wenn geklickt','Wenn doppelt geklickt']"></v-select> -->
            <div
              :key="ev.a"
              v-for="ev in selEl.events"
              style="border:1px dotted #ccc; margin-top:20px"
            >
              <h4>On Click</h4>
              <table>
                <tr>
                  <td style="padding:20px;">
                    <div :key="con.a" v-for="con in ev.cond">Darf nicht leer sein: {{con.el}}</div>
                    <button type="button">+</button>
                  </td>
                  <td style="padding:20px;">
                    <span>Ereignis: {{ev.type}}</span>
                  </td>
                </tr>
              </table>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <!-- ################################################################### -->
          <!-- Props -->
          <!-- ################################################################### -->
          <b-card title="Properties">
            <!-- <h4>Properties</h4> -->
            <!-- <table> < !-- in $UI(selEl.typ+'x').props -- >
      <tr v-for="(infos, propId) in $PROPS(selEl.typ)" :key="propId"> < !-- v-if="this.props.hasOwnProperty(propId)"-- >
        <td><label :for="propId">{{infos.text}}</label></td>
        <td><b-input v-if="infos.typ=='int'" :id="propId" v-model.number="selEl[propId]" number /></td>
        <td><input v-if="infos.typ=='str'" :id="propId" v-model="selEl[propId]"  /></td>
      </tr>
            </table>-->
            <div class="mt-4">
              <b-form-group
                v-for="(infos, propId) in TYPES[selEl.typ].props"
                :key="propId"
                class="mt-0"
                label-cols="4"
                label-cols-lg="2"
                label-size="sm"
                :label="infos.text"
                :label-for="propId"
              >
                <b-form-input
                  v-if="infos.typ=='int'"
                  :id="propId"
                  size="sm"
                  v-model="selEl[propId]"
                  number
                />
                <b-form-input
                  v-if="infos.typ=='str'"
                  :id="propId"
                  size="sm"
                  v-model="selEl[propId]"
                />
              </b-form-group>
            </div>
            <!-- <td><label for="l">Links&nbsp; </label></td>
        <td><input id="l" v-model.number="selEl.l" number /></td>

      <label for="t">Oben&nbsp; </label>
      <input id="t" v-model.number="selEl.t" number /><br />

      <label for="w">Breite </label>
      <input id="w" v-model.number="selEl.w" number /><br />

      <label for="h">Höhe&nbsp; </label>
            <input id="h" v-model.number="selEl.h" number /><br />-->
            <!-- TODO: Bei Eingabe von Höhe/Breite-Werten, Binding ggf anpassen (damit auch funzt) :-/ -->
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col>
          <b-card title="Output / App Description">
            <b-textarea :readonly="true" :value="JSON.stringify(items) + '\n\nsettings:'+JSON.stringify(settings)+'\n\naktuelle-max-id:'+maxEl" :rows="7"></b-textarea>
            
            <!-- <b-row>
            < !-- <b-col><b-checkbox :v-model="settings.autosave">Auto save</b-checkbox></b-col> -- >
              <b-col> -->
              <!-- <b-button @click="persist" :variant="itemsSaved ? 'success' : 'outline-success'" class="mt-3">
                {{itemsSaved ? "Saved" : "Would you perhaps consider to save your changes anytime soon???"}}
              </b-button>
              
                <b-button @click="items=[]" variant="outline-danger" class="mt-3 ml-3">Reset</b-button> -->
              <!-- </b-col>
            </b-row> -->
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script>
//simport Vue from "vue";
import Layout from "../layouts/Layout";
import { fabric } from "fabric-browseronly";
//import "@progress/kendo-theme-material/dist/all.css";
//import { Grid, GridToolbar } from "@progress/kendo-vue-grid";
//import Hamoni from "hamoni-sync";
//import DropDownCell from "./components/DropDownCell.vue";
//import CommandCell from "./components/CommandCell.vue";
//Vue.component("kendo-dropdown-cell", DropDownCell);
//Vue.component("kendo-command-cell", CommandCell);

class Prop {
  constructor(text, typ) {
    //(this.text, this.typ) = (text, typ);
    this.text = text;
    this.typ = typ;
  }
} 
const TYPES = {
  but00: {
    name: "Button",
    props: {
      l: new Prop("Left", "int"),
      t: new Prop("Top", "int"),
      w: new Prop("Width", "int"),
      h: new Prop("Height", "int")
    }
  },
  num00: {
    name: "Numeric",
    props: {
      l: new Prop("Left", "int"),
      t: new Prop("Top", "int"),
      w: new Prop("Width", "int"),
      h: new Prop("Height", "int")
    }
  }
  
};

const DEFAULT_PROPS = {
  l: 0,
  t: 0,
  w: 100,
  h: 40,
  /*v:true,*/ events: [],
  //_tool: {hover:false,}
};
const ELEMENTS = [
  {
    typ: "but00",
    url: "/img/ui/button.png",
    ...DEFAULT_PROPS,
    /*x:12,*/
  },
  {
    typ: "num00",
    url: "/img/ui/textbox.png",
    ...DEFAULT_PROPS,
    w: 200,
  }
];

const EVENTTYPES = {
  // <- unterschiedlich je nach Elementtyp?
  click: { desc: "On Click" },
  double: { desc: "On Doubleclick" },
  keyup: { desc: "On Key Up" }
};

const ACTIONTYPES = {
  // <- unterschiedlich je nach Elementtyp?
  info: { desc: "Display a Message!" },
  mail: { desc: "Send an Email!", req: "email_delivery" }, // requires smtp entries (or other means of delivery)
  navi: { desc: "Navigate to another screen!" },
  jump: { desc: "Jump through a hoop!" }
};

export default {
  //name: "app",
  components: {
    Layout,
    //vSelect,
    //FabricCanvas: vFW.FabricCanvas,
    //FabricRectangle: vueFabricWrapper.FabricRectangle,
    //FabricLine: vFW.FabricLine,
    //FabricCircle: vueFabricWrapper.FabricCircle,
    //FabricGroup: vueFabricWrapper.FabricGroup,
    //FabricImageFromURL: vFW.FabricImageFromURL
  },

  created() {
    this.EVENTTYPES = EVENTTYPES;
    this.ACTIONTYPES = ACTIONTYPES;
    this.ELEMENTS = ELEMENTS;
    this.LEFTOFFSET = 0; //250;
    this.TYPES = TYPES;
  },

  props: [],

  data: function() {
    return {
      items: [
        /* Diese Liste soll auch 1:1 als Form-Definition übergeben werden könnnen */
        //new BaseElement(),
        /* { a: "el-x", typ: "but00", l: 20, t: 150, w: 100, h: 40, url: "/img/ui/button.png",
          events: [{ a: "ev-1", type: "Formular senden", cond: [
                { a: "c1", type: "notempty", el: "el-a" },
                { a: "c2", type: "notempty", el: "el-b" }
              ] }] }, */
      ],
      itemsSaved: true,

      selEl: null,
      maxEl: 0,
      
      selectedNewEvent: "click", // -1, // temporary / for testing purposes
      selectedAction: -1,
      onNewEreignis: null,
      
      settings: {
        autosave: false,
        grid: false,
      },

      canvas: null,
      canX: 480,
      canY: 320,
    };
  },
  //   mounted: function() {
  //     const ref = this.$refs.can;
  //     const canvas = new fabric.Canvas(ref);

  //     const rect = new fabric.Rect({
  //       fill: 'red',
  //       width: 20,
  //       height: 20
  //     });
  //     canvas.add(rect);
  //  },

  mounted() {
    this.selEl = this.items[0];

    // ATM tools as well as settings are (only) persisted on "save" click
    if (localStorage.settings) { this.settings = { ...this.settings, ...JSON.parse(localStorage.settings) } } // make sure "all"/new settings are present as well
    if (localStorage.items)    { this.items = JSON.parse(localStorage.items) }

    //this.maxEl = this.items.reduce((a,b) => { return (a.a < b.a) ? b.a : a.a; }) + 1; 
    if (this.items.length > 0)
      this.maxEl = Math.max.apply(Math, this.items.map(function(o) { return o.a; }))


    //const ref = this.$refs.can;
    //this.canvas = new fabric.Canvas('can', { preserveObjectStacking: true, isDrawingMode:false });
    this.canvas = new fabric.Canvas('can', { preserveObjectStacking: true });
    //this.canvas =  fabric.createCanvasForNode(200,200);
    //this.canvas = new fabric.StaticCanvas(null, { width: 200, height: 200 });

    //const canvas = this.canvas;
    const rect = new fabric.Rect({
      fill: 'red',
      width: 20,
      height: 20,
      top: 10,
      left: 10,
    });

    this.canvas.add(rect);
    //this.canvas.on('object:moving', this.preventDragOffCanvas)
  },

  computed: {},

  // watch: {
  //   onNewEreignis: function (newVal) {
  //     //this.gotoMonth(newVal);
  //     console.log("Event: "+newVal)
  //   }
  // },

  watch: {
    items: { handler() { this.itemsSaved = false }, deep:true }
  },

  methods: {
    eventAdd(event) {
      console.log(event);
    },

    persist() {
        localStorage.settings = JSON.stringify(this.settings);
        localStorage.items    = JSON.stringify(this.items);
        this.itemsSaved = true;
    },

    toolbox_add(element) {
      //console.log(element);
      var newel = { a:this.maxEl++, ...element };
      //delete newel._tool;
      //newel._tool = undefined; // only relevant for "parent" tools!

      this.items.push(newel);
      //this.selEl = newel;

      //vFW.getCanvas();
      //console.log(this.$refs.canvas);
      //this.$refs.canvas.canvas.selectionKey = 'el-0';// geht so leider nicht...
      
    },

    // toolbox_hover(hover, /*event,*/ el) {
    //   console.log(el)
    //   el.hovered = hover
    // },
    onSelected(event) {
      console.log(event);
      //if (this.selEl!==event.id) {
      this.selEl = this.items.find(i => /*'el-'+*/i.a === event.id);
      console.debug("Selected " + event.id);
      //this.updateThaMightyPropScreen()
      //}
    },
    onDeselected(event) {
      //console.log(event);
      //console.log(this.selEl);
      if (this.selEl && this.selEl.a.valueOf() === event.id.valueOf()) {
        this.selEl = null;
        console.debug("Deselected " + event.id);
        //this.updateThaMightyPropScreen()
      }
    },

    modified(/*event*/) {
      //e.dataTransfer.dropEffect = "copy";
      //console.log(eventData);
      //console.log(top:" + eventData.target.top + " left:" + eventData.target.left);
      //console.log(this.selEl)
      //console.log(this.items)

      //// Leider muss man hier wohl (nochmal) manuell festhalten wo hingezogen wurde
      // this.selEl.l = Math.round(event.target.left - this.LEFTOFFSET)
      // this.selEl.t = event.target.top < 0 ? 0 : Math.round(event.target.top)
      // this.selEl.w = Math.round(event.target.width * event.target.scaleX)
      // this.selEl.h = Math.round(event.target.height * event.target.scaleY)

      // (TEST) Falls oben rausgeschoben -> Entfernen.
      if (this.selEl.t + this.selEl.h <= 0) {
        const index = this.items.indexOf(this.selEl);
        if (index > -1) {
          this.selEl = null;
          this.items.splice(index, 1);
          this.info("Ein Element entfernt.");
        }
      }
      //console.log(event.target)
    },

    info(msg) {
      console.log("INFO: " + msg);
    },

    onDragging(event) {
      this.selEl.l = Math.round(event.target.left - this.LEFTOFFSET);
      this.selEl.t = Math.round(event.target.top);
      this.selEl.w = Math.round(event.target.width * event.target.scaleX);
      this.selEl.h = Math.round(event.target.height * event.target.scaleY);
    },

    // updateThaMightyPropScreen() {

    // },

    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/* input.btn.btn-default:hover, button.btn.btn-default:hover {
    background-color: rgba(0,0,0,0.5);
    border-color: rgba(0,0,0,0.5);
    -webkit-transition: background-color 0.3s linear;
    -moz-transition: background-color 0.3s linear;
    -o-transition: background-color 0.3s linear;
    transition: background-color 0.3s linear;
} */
</style>
