<template>
<layout name="LayoutDefault">  
<b-container>
  <b-row no-body style="margin-bottom:20px;">
  <b-col>
    <b-card no-body>
    <fabric-canvas :width="800" :height="300" style="width:800px;">

      <!-- Separation between Toolbox and actual Canvas -->
      <!-- TODO: width/height as params, y2 set as well -->
      <fabric-line id="tb-border" :x1="250" :x2="250" :y1="0" :y2="1000"
        fill="#ccc" stroke="#ccc" :strokeDashArray="[5,5]" />

      <!-- Einzelner Button vorerst mal statisch..  naa, doch ned... -- >
      <fabric-image-from-URL
        :id="item.a"
        v-bind:key="item.a"
        v-for="item in items"
        url="/img/ui/textbox.png"
        :left="item.l"
        :top="item.t"
        :hasRotatingPoint="false"
        
        @mouseup="dragTo"
        @selected="selected"
        @deselected="deselected"    

      /> -->

    <!-- ################################################################### -->
    <!-- #  Individually generated Elements                                # -->
    <!-- ################################################################### -->
      <fabric-image-from-URL
        :id="item.a"
        v-bind:key="item.a"
        v-for="item in items"
        :url="item.url"
        :left="item.l + LEFTOFFSET"
        :top="item.t"
        :hasRotatingPoint="false"
        
        @mouseup="modified"
        @modified="modified"

        @selected="onSelected"
        @deselected="onDeselected"    

      />
    </fabric-canvas>
    </b-card>

  </b-col></b-row><b-row v-if="selEl"><b-col>

  <!-- <b-card no-body id="propScreen" v-if="selEl" style="/*display:flex;* / margin-top:20px;*/"> -->
    
    <!-- ################################################################### -->
    <!-- #  Events                                                         # -->
    <!-- ################################################################### -->
    <b-card class="events" title="Events">
    <!-- <h3>Events</h3> -->

      <!-- Select new event -->
      <!-- TODO EV: Possibly use b-form-select(s) ... -->
      <b-select v-model="selectedNewEvent"  size="sm" class="mt-3"><!-- @change="eventAdd" -->
      <!-- <b-form-select v-model="selected" @change="this.console.log($event)"> -->
        <option :value="-1" v-if="selectedNewEvent == -1">Add new event ...</option>
        <option :value="-1" v-else>Cancel adding event!</option>
        <option v-for="(event, key) in this.EVENTTYPES" :key="key" :value="key">{{event.desc}}</option>
        <!-- <option>On Click</option>
        <option>On Doubleclick</option> -->
        <!-- <v-option v-for="item of monthoptions" :value="item" @click="gotoMonth(item)">{{item}}</v-option> -->
      </b-select>
      <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
      
      <!-- Select new action -->
      <b-select v-if="selectedNewEvent != -1" v-model="selectedAction" @change="eventAdd" size="sm" class="mt-3">
      <!-- <b-form-select v-model="selected" @change="this.console.log($event)"> -->
        <option :value="-1">Select action ...</option>
        <!-- <option :value="-1" v-else>Cancel adding action ...</option> -->
        <option v-for="(action, key) in this.ACTIONTYPES" :key="key" :value="key">{{action.desc}}</option>
        <!-- <option v-for="(event, key) in this.EVENTTYPES" :key="key" :value="key">{{event.desc}}</option> -->
        <!-- <option>On Click</option>
        <option>On Doubleclick</option> -->
        <!-- <v-option v-for="item of monthoptions" :value="item" @click="gotoMonth(item)">{{item}}</v-option> -->
      </b-select>
    <!-- <v-select :options="['Wenn geklickt','Wenn doppelt geklickt']"></v-select> -->

    <div :key="ev.a" v-for="ev in selEl.events" style="border:1px dotted #ccc; margin-top:20px">
      <h4>On Click</h4>
      <table>
        <tr><td style="padding:20px;">
          <div :key="con.a" v-for="con in ev.cond">
            Darf nicht leer sein: {{con.el}}
          </div>
          <button type="button">+</button>
        </td><td style="padding:20px;">
          <span>Ereignis: {{ev.type}}</span>
        </td></tr>
      </table>
    </div>
    </b-card>

  </b-col><b-col>

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
      </table> -->

      <div class="mt-4">
      <b-form-group v-for="(infos, propId) in $PROPS(selEl.typ)" :key="propId" class="mt-0"
        label-cols="4" label-cols-lg="2" label-size="sm" :label="infos.text" :label-for="propId">
        <b-form-input v-if="infos.typ=='int'" :id="propId" size="sm" v-model="selEl[propId]" number />
        <b-form-input v-if="infos.typ=='str'" :id="propId" size="sm" v-model="selEl[propId]" />
      </b-form-group>
      </div>
      <!-- <td><label for="l">Links&nbsp; </label></td>
        <td><input id="l" v-model.number="selEl.l" number /></td>

      <label for="t">Oben&nbsp; </label>
      <input id="t" v-model.number="selEl.t" number /><br />

      <label for="w">Breite </label>
      <input id="w" v-model.number="selEl.w" number /><br />

      <label for="h">Höhe&nbsp; </label>
      <input id="h" v-model.number="selEl.h" number /><br /> -->

      <!-- TODO: Bei Eingabe von Höhe/Breite-Werten, Binding ggf anpassen (damit auch funzt) :-/ -->
    </b-card>
  </b-col>
  </b-row>
  
</b-container> 
</layout>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import vFW from "vue-fabric-wrapper";
import Layout from "../layouts/Layout";
import vSelect from "vue-select";
//import Button from "../assets/Types";

//simport Vue from "vue";
//import fabric from "fabric";
//import "@progress/kendo-theme-material/dist/all.css";
//import { Grid, GridToolbar } from "@progress/kendo-vue-grid";
//import Hamoni from "hamoni-sync";
//import DropDownCell from "./components/DropDownCell.vue";
//import CommandCell from "./components/CommandCell.vue";

//Vue.component("kendo-dropdown-cell", DropDownCell);
//Vue.component("kendo-command-cell", CommandCell);

//const primitiveName = "kendo-grid";
//var canvas;

const EVENTTYPES = { // <- unterschiedlich je nach Elementtyp?
  click:  {desc:"On Click",       },
  double: {desc:"On Doubleclick", },
  keyup:  {desc:"On Key Up", },
};

const ACTIONTYPES = { // <- unterschiedlich je nach Elementtyp?
  info: {desc:"Display a Message!"},
  mail: {desc:"Send an Email!", req:"email_delivery" }, // requires smtp entries (or other means of delivery)
  navi: {desc:"Navigate to another screen!", },
  jump: {desc:"Jump through a hoop!", },
};


export default {
  name: "app",
  //TYPES:TYPES,

  //c: canvas,
  components: {
    //EVENTTYPES,
    //Grid,
    //GridToolbar,
    //Button,
    Layout,
    vSelect,
    FabricCanvas: vFW.FabricCanvas,
    //FabricRectangle: vueFabricWrapper.FabricRectangle,
    FabricLine: vFW.FabricLine,
    //FabricCircle: vueFabricWrapper.FabricCircle,
    //FabricGroup: vueFabricWrapper.FabricGroup,
    FabricImageFromURL: vFW.FabricImageFromURL,
  },

  created () {
    this.EVENTTYPES = EVENTTYPES // const does not need to be a reactive variable (data)
    this.ACTIONTYPES = ACTIONTYPES
    this.LEFTOFFSET = 250
  },

  props: [],
  data: function() {
    return {
      items: [
        /* Diese Liste soll auch 1:1 als Form-Definition übergeben werden könnnen */
        { a: "el-x", typ:"but00", l:20, t:150, w:100, h:40, url:"/img/ui/button.png", events:[{a:"ev-1", type:"Formular senden", cond:[{a:"c1",type:"notempty",el:"el-a"},{a:"c2",type:"notempty",el:"el-b"}]}] }, 
        { a: "el-a", typ:"num00", l:20, t:20, w:250, h:40, url:"/img/ui/textbox.png", events:[] }, 
        { a: "el-b", typ:"num00", l:20, t:80, w:250, h:40, url:"/img/ui/textbox.png", events:[] },
        //new Button(),
        ],
      selEl: null,
      //EVENTTYPES,
      // types: {
      //   but: {props: {l:["Left","int"],t:["Top","int"],w:["Width","int"],h:["Height","int"]},},
      //   num: {props: {l:["Left","int"],t:["Top","int"],w:["Width","int"],h:["Height","int"]},},
      // },
      selectedNewEvent: -1,
      selectedAction: -1,

      onNewEreignis: null,
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

  mounted() { this.selEl = this.items[0]; }, // DEBUG: Button schon vorauswählen

  computed: {},

  // watch: {
  //   onNewEreignis: function (newVal) {
  //     //this.gotoMonth(newVal);
  //     console.log("Event: "+newVal)
  //   }
  // },

  methods: {

    eventAdd(event) {
      console.log(event);
    },

    modified(event) {
      //e.dataTransfer.dropEffect = "copy";
      //console.log(eventData);
      //console.log(top:" + eventData.target.top + " left:" + eventData.target.left);
      //console.log(this.selEl)
      //console.log(this.items)

      // Leider muss man hier wohl (nochmal) manuell festhalten wo hingezogen wurde
      this.selEl.l = Math.round(event.target.left - this.LEFTOFFSET)
      this.selEl.t = Math.round(event.target.top)
      this.selEl.w = Math.round(event.target.width * event.target.scaleX)
      this.selEl.h = Math.round(event.target.height * event.target.scaleY)

      console.log(event.target)
    },

    onSelected(event) {
      //console.log(event)
      //if (this.selEl!==event.id) {
        this.selEl = this.items.find(i => i.a === event.id);
        console.debug("Selected "+event.id)
        //this.updateThaMightyPropScreen()
      //}
    },
    onDeselected(event) {
      //console.log(event);
      //console.log(this.selEl);
      if (this.selEl && this.selEl.a.valueOf() === event.id.valueOf()) {
        this.selEl = null
        console.debug("Deselected "+event.id)
        //this.updateThaMightyPropScreen()
      }
    },
    // updateThaMightyPropScreen() {

    // },

    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
};
</script>

<style>
  /* .events { width:400px; } */
</style>
