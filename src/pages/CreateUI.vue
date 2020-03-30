<template>
<layout name="LayoutDefault">
<b-container>
<b-row no-body>

  <!-- "Packages vor Projects" -->

  <b-col cols="3">

    <!-- SELECT TOOL -->
    <b-dropdown class="mb-3">
      <template v-slot:button-content>
        <!--Custom <strong>Content</strong> with <em>HTML</em> via Slot-->
        <strong>{{toolOpened ? toolOpened.name : "No tool opened"}}</strong>
      </template>
      <b-dropdown-item-button v-b-modal.modal-new-tool>New tool...</b-dropdown-item-button>
      
      <b-dropdown-divider v-if="tools.length" />
      <!--<b-dropdown-group v-if="pages.length" header="Your Pages">TODO: Projektname stattdessen -->
      <b-dropdown-group v-if="tools.length">
        <b-dropdown-item-button 
          v-for="t in tools" :key="t.id" :value="t.id" 
          @click="selected.toolId = t.id" 
          :active="selected.toolId===t.id">{{t.name}}</b-dropdown-item-button>
      </b-dropdown-group>
    </b-dropdown>

    <!-- NEW TOOL -->
    <b-modal id="modal-new-tool" title="Create a new tool" @ok="e => {e.preventDefault(); this.onNewTool()}" @focus="this.console.log('blub')">
      <form ref="form" @submit.stop.prevent="onNewTool">
      <b-form-group :state="newTool.state" label="Tool description:" label-for="name-input"
        invalid-feedback="Name is required (Hint: What does this tool do?)"
      >
        <b-form-input id="name-input" v-model="newTool.name" :state="newTool.state" required autofocus />
      </b-form-group>
      </form>
    </b-modal>
      
      
    <!-- TOOLBOX -->
    <b-card title="Toolbox" class="d-none d-sm-block"><hr>
      <!-- <div v-for="el in ELEMENTS" :key="el.typ" class="d-flex mb-3 bd-highlight">
        <b-img :id="'tool-'+el.typ" :src="el.url" @click="toolbox_add(el)" />
      </div> -->
      <div v-for="(e,k) in TYPES" :key="k" class="d-flex mb-3 bd-highlight">
        <b-img :id="'tool-'+k" :src="e.url" @click="toolbox_add(e,k)" width="100" />
      </div>
    </b-card>
    
  </b-col>
  <b-col cols="9">

    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <!-- ###################################################################### CANVAS #### -->
    <b-card no-body>
      <div class="mx-auto d-block p-0 m-0" >
      <canvas id="can" :width="canX" :height="canY" style="background-color:#ffffff00/*#7799FF22*/" class="p-0 m-0">
        <!-- @moving="onChanging" debounce="1000" -->
        <canvas-object v-for="item in items" :key="item.a" :item="item" 
          :rend="TYPES[item.typ].rend"
          :selected="item.a === selected.itemId"
          
          @changed="onItemThinksSomethingMightBeDifferent"
          
          @selected  ="selected.itemId = item.a" 
          @deselected="selected.itemId = 0 /* verlässt sich darauf, dass vor 'selected' aufgerufen*/"

          @changing="onChanging($event, item)"
          @modified="onModified($event, item)" />
      </canvas>
      </div>
    </b-card>

    <!-- Save / Reset -->
    <b-button @click="persist" :variant="toolsSaved ? 'success' : 'outline-success'" class="mt-3">
      {{toolsSaved ? "Saved" : "Save changes?"}}
    </b-button>
    <b-button @click="loadTools" variant="outline-danger" class="mt-3 ml-3">Reset</b-button>

  </b-col>

</b-row>
<b-row v-if="itemSelected" class="mt-3">
        <b-col >
          <!-- <b-card no-body id="propScreen" v-if="itemSelected" style="/*display:flex;* / margin-top:20px;*/"> -->
          <!-- ################################################################### -->
          <!-- #  Events                                                         # -->
          <!-- ################################################################### -->
          <b-card class="events" title="Events">
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
              v-for="ev in itemSelected.events"
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
            <div class="mt-4">
              <b-form-group
                v-for="(prop, key) in Object.values(TYPES[this.itemSelected.typ].prop).filter(f=>!f.hidden)"
                :key="key"
                class="mt-0"
                label-cols="4"
                label-cols-lg="2"
                label-size="sm"
                :label="prop.txt"
                :label-for="key"
              >
                <b-form-input v-if="prop.typ=='int'" :id="key"
                  debounce="500" size="sm" v-model="itemSelected[key]" number />

                <b-form-input v-if="prop.typ=='str'" :id="key" 
                  debounce="500" size="sm" v-model="itemSelected[key]" />

              </b-form-group>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col>
          <b-card title="Output / App Description">
            <b-textarea :readonly="true" :value="JSON.stringify(items) + '\n\nsettings:'+JSON.stringify(settings)" :rows="7"></b-textarea>     
            <!-- <b-row>
            < !-- <b-col><b-checkbox :v-model="settings.autosave">Auto save</b-checkbox></b-col> -- >
              <b-col> -->
              <!-- <b-button @click="persist" :variant="toolsSaved ? 'success' : 'outline-success'" class="mt-3">
                {{toolsSaved ? "Saved" : "Would you perhaps consider to save your changes anytime soon???"}}
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
import Vue from "vue";
import Layout from "../layouts/Layout"; 
import { fabric } from "fabric-browseronly";
import CanvasObject from "../components/CanvasObject"

const BASIC_PROPS = {
  a: { txt:'ID',     typ:'int', readonly:true, hidden:true },
  l: { txt:'Left',   typ:'int', def:0 },
  t: { txt:'Top',    typ:'int', def:0 },
  w: { txt:'Width',  typ:'int', def:100 },
  h: { txt:'Height', typ:'int', def:40 },
  v: { txt:'Visibility', typ:{1:'SHOWN',0:'HIDDEN',2:'DISINTEGRATED'}, def:'SHOWN'},
  c: { txt:'Content',typ:'str', def:''}
};

const TYPES = {

  // Label
  lab00: {
    // Default values should be given in this place, details like text propably elsewhere?
    prop: { ...BASIC_PROPS, col: {txt:'Color', typ:'str', def:''}, size:{txt:'Size',typ:'int',def:18} }, 
    url: "/img/ui/button.png",
    rend: function(item) { 
      //var rect = new fabric.Rect({top:0, left:0, width:item.w, height:item.h, fill:'#cccccc22', stroke:'#ccccccaa', originX:'center', originY:'center'})
      let text = new fabric.Text(item.c||'Text', { originX:'center', originY:'center', fill:item.col||'#777777ee', fontSize:item.size||18, fontFamily:'Helvetica, Arial, sans-serif', })
      return new fabric.Group([text], {left:item.l, top:item.t/*, width:item.w, height:item.h*/})
    },
  },

  // Button
  but00: {
    // Default values should be given in this place, details like text propably elsewhere?
    prop: { ...BASIC_PROPS, }, 
    url: "/img/ui/button.png",
    rend: function(item) { 
      let rect = new fabric.Rect({top:0, left:0, width:item.w, height:item.h, fill:'#cccccc22', stroke:'#ccccccaa', originX:'center', originY:'center'})
      let text = new fabric.Text(item.c||'Button', { originX:'center', originY:'center', fill:'#777777ee', fontSize:18, fontFamily:'Helvetica, Arial, sans-serif', })
      return new fabric.Group([rect, text], {left:item.l, top:item.t/*, width:item.w, height:item.h*/})
    },
  },

  // Textbox (numerisch)
  num00: {
    prop: { ...BASIC_PROPS, h: { txt:'Height', typ:'int', def:30 }, w: { txt:'Width',  typ:'int', def:100 }, },
    url: "/img/ui/textbox.png",
    //rend: function(item) { return new fabric.Rect({top:item.t, left:item.l, width:item.w, height:item.h, fill:'#cccccc22', stroke:'#ccccccaa'}) },
    rend: function(item) { 
      let rect = new fabric.Rect({top:0, left:0, width:item.w, height:item.h, fill:'#ffffffdd', stroke:'#ccccccaa', originX:'left', originY:'center'})
      let text = new fabric.Text(item.c||'Numeric', { left:10, originX:'left', originY:'center', fill:'#222222cc', fontSize:18, fontFamily:'Helvetica, Arial, sans-serif',  })
      return new fabric.Group([rect, text], {left:item.l, top:item.t/*, width:item.w, height:item.h*/})
    },
  }
};

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
  components: {
    Layout,
    CanvasObject,
  },

  created() {
    this.EVENTTYPES = EVENTTYPES;
    this.ACTIONTYPES = ACTIONTYPES;
    this.LEFTOFFSET = 0; //250;
    this.TYPES = TYPES;

    window.addEventListener('keydown', this.onKey)
  },
  beforeDestroy() { window.removeEventListener('keydown', this.onKey) },

  //props: [],

  data: function() {
    return {
      
      tools: [],
      //toolOpened: null,
      newTool: {name:'', state:null},

      //items: [], /* Diese Liste soll auch 1:1 als Form-Definition übergeben werden könnnen */
      toolsSaved: true,
      //itemSelId: 0,
      //itemSelected: null,
      //maxEl: 0,

      selected: { toolId:0, itemId:0, },

      
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

  computed: {
    //items() { return this.$store.getters.currentPage.items },
    items() {  return this.toolOpened ? this.toolOpened.items : []
      //get: () => { return this.toolOpened ? this.toolOpened.items : [] },
      //set: newVal => { this.toolOpened[this.toolOpened.indexOf(this.itemSelected)] = newVal },
    },
    itemSelected() { return this.items.find(i => i.a === this.selected.itemId); },
    toolOpened() { return this.tools.find(t => t.id === this.selected.toolId) },

    //displayedProps() { return Object.fromEntries(Object.entries(TYPES[this.itemSelected.typ].prop).filter(p => p.a != 1)) }
  },

  mounted() {

    this.loadSettings()
    this.loadTools()

    // let page = this.$store.getters.currentPage
    // this.items = page.items
    //this.items = this.$store.getters.currentPage.items // <- computed


    //this.maxEl = this.items.reduce((a,b) => { return (a.a < b.a) ? b.a : a.a; }) + 1; 
    // if (this.items.length > 0)
    //   this.maxEl = Math.max.apply(Math, this.items.map(function(o) { return o.a; }))

    //const ref = this.$refs.can;
    //this.canvas = new fabric.Canvas('can', { preserveObjectStacking: true, isDrawingMode:false });
    this.canvas = new fabric.Canvas('can', { preserveObjectStacking: true });
    this.canvasResizeObject = new fabric.Rect({top:0, left:0, width:this.canX, height:this.canY, fill:'#7799FF22', /* dashed? stroke:'#ccccccaa', originX:'center', originY:'center'*/
      /*hasBorders:false,*/ hasRotatingPoint:false, /*lockRotation?*/ lockMovementX:true, lockMovementY:true, 
      selectable:false, //hasControls: false,
      hoverCursor: 'pointer',
    })
    // Haut so ganz ok hin, sollte aber wohl von "CanvObject" erben oä (Properties, Events, etc. ermöglichen)
    // this.canvasResizeObject.on('mousedblclick', () => {
      
    //   // End select
    //   if (this.canvasResizeObject.selectable) {
    //     this.canvasResizeObject.selectable = false
    //     return
    //   }

    //   this.canvasResizeObject.selectable = true
    //   this.canvas.setActiveObject(this.canvasResizeObject)
    //   console.log(this.canvasResizeObject)
    // })
    this.canvas.add(this.canvasResizeObject);
    //this.__canvases.push(this.canvas);

    // Selektierte Gruppenbewegungen abfangen
    this.canvas.on('object:moving', e => {
      /*if (e.target['yaddaYaddaId'])
        console.log("Einzelobjekt")
      else*/ if (e.target._objects[0]['yaddaYaddaId'])
        console.log("Mehrfachobjektbewegung: ",e.target._objects.length)
    })

    // Letzte Auswahl wiederherstellen (Komfortfunktion)
    if (localStorage.selected) 
      this.selected = {...this.selected, ...JSON.parse(localStorage.selected)}

    //this.canvas.select

    this.$watch('tools', () => { this.toolsSaved = false }, {deep:true});
  },

  // Provide (a getter for) the canvas instance
  provide() { return { $canvas: () => { /*console.log("prov", this.canvas);*/ return this.canvas }, } },

  watch: {
    selected: { handler() { localStorage.selected = JSON.stringify(this.selected) }, deep:true }, // Auswahl Autosave
    //items: { handler() { this.toolsSaved = false }, deep:true }
    //$pageProvider: { handler(val) { console.log("pagePro Val: ",valn) }}
    //itemSelected: { handler(item) { this.onModified(item, false)}, deep:true }
  },

  methods: {
    eventAdd(event) {
      console.log(event);
    },

    persist() {
        localStorage.settings = JSON.stringify(this.settings);
        localStorage.tools    = JSON.stringify(this.tools);
        this.toolsSaved = true;
    },

    loadTools()    { if (localStorage.tools)    this.tools    = JSON.parse(localStorage.tools) },
    loadSettings() { if (localStorage.settings) this.settings = {...this.settings,...JSON.parse(localStorage.settings)} }, // make sure "all"/new settings are present as well

    toolbox_add(tool, key) {
      console.log(this.max(this.items,'a')+1);

      var newel = { a:(this.max(this.items,'a')+1), typ:key };
      Object.keys(tool.prop).forEach(
        key => { if (tool.prop[key].def !== undefined) 
        newel[key] = tool.prop[key].def 
      });//Object.keys(tool.prop).forEach((key) => newel[key] = tool.prop[key].def );

      //delete newel._tool;
      //newel._tool = undefined; // only relevant for "parent" tools!

      this.items.push(newel);
    },

    //getItem(itemId) { return this.items.find(i => i.a===itemId) },
    max(list,el) { return list.length==0 ?0 :Math.max.apply(Math,list.map(o => o[el])) },
    log(iwas) { console.log(iwas) },
    tab(iwas) { console.table(iwas) },

    onItemThinksSomethingMightBeDifferent(e) {
      console.log("%c onChange: ","font-weight:bold; color:green; text-decoration:underline", e)
    },
    // toolbox_hover(hover, /*event,*/ el) {
    //   console.log(el)
    //   el.hovered = hover
    // },

    onKey(e) {
        //console.log(keyevent)
        switch(e.key){
          case "Delete": 
            if (e.shiftKey) { console.log('%c Key Event (Shift+Del):','color:orange; font-weight:bold',{e}); return}
            if (this.itemSelected) //this.items = this.items.filter(it => it != this.itemSelected)
              Vue.delete(this.items, this.itemSelected)
        }
        // if (keyevent.key == "Delete") {

        // }
        //console.trace("onkey")
    },

    onNewTool() {
      // Check validity (= new page name present)
      this.newTool.state = this.$refs.form.checkValidity()
      if (!this.newTool.state)
        return

      // Create new tool item
      let newId = (this.tools.length==0 ?1 :Math.max.apply(Math,this.tools.map(o => o.id))+1)
      var newTool= {id:newId, name:this.newTool.name, items:[]}

      // Add and select tool
      this.tools.push(newTool)
      this.selected.toolId = newId
      //this.toolOpened = newTool
        
      // Hide modal
      this.newTool.name = ''
      this.newTool.state = null
      this.$nextTick(() => { this.$bvModal.hide('modal-new-tool') })
    },

    // onSelected(event) { 
      
    //   console.log("Selected ", event);
    //   this.selected.itemId = event.id
    //   //this.itemSelected = this.items.find(i => i.a === event.id);
      
    //   //console.log("Sel: ", this.itemSelected)
    //   //console.log("%c SECOND: ","font-weight:bold; color:red", second)
    //   //console.table(this.items.map(x => { return {...x} } )) // <- "resolve" getters
    //   //this.updateThaMightyPropScreen()
    // },
    // onDeselected(event) {
    //   //console.log(event);
    //   console.log("Deselected", {...this.itemSelected});
    //   if (this.itemSelected && this.itemSelected.a.valueOf() === event.id.valueOf()) {
    //     //this.itemSelected = null;
    //     this.selected.itemId = 0


    //     //console.debug("Deselected " + event.id);
    //     //this.updateThaMightyPropScreen()
    //   }
    // },

    // modified(/*event*/) {
    //   //e.dataTransfer.dropEffect = "copy";
    //   //console.log(eventData);
    //   //console.log(top:" + eventData.target.top + " left:" + eventData.target.left);
    //   //console.log(this.itemSelected)
    //   //console.log(this.items)

    //   //// Leider muss man hier wohl (nochmal) manuell festhalten wo hingezogen wurde
    //   // this.itemSelected.l = Math.round(event.target.left - this.LEFTOFFSET)
    //   // this.itemSelected.t = event.target.top < 0 ? 0 : Math.round(event.target.top)
    //   // this.itemSelected.w = Math.round(event.target.width * event.target.scaleX)
    //   // this.itemSelected.h = Math.round(event.target.height * event.target.scaleY)

    //   // (TEST) Falls oben rausgeschoben -> Entfernen.
    //   if (this.itemSelected.t + this.itemSelected.h <= 0) {
    //     const index = this.items.indexOf(this.itemSelected);
    //     if (index > -1) {
    //       this.itemSelected = null;
    //       this.items.splice(index, 1);
    //       this.info("Ein Element entfernt.");
    //     }
    //   }
    //   //console.log(event.target)
    // },

    // onSelected(event, id) {
    //   this.selected.itemId = id
    //   console.log(this.selected)
    // },
    // onDeselected(event) {
    //   //if (selected.itemId===item.a) selected.itemId = 0 }
    //   console.log(event)
    // },

    onChanging(event, item) {
      console.log({event,item})
      // item.l = Math.round(event.target.left);
      // item.t = Math.round(event.target.top);
      // item.w = Math.round(event.target.width * event.target.scaleX);
      // item.h = Math.round(event.target.height * event.target.scaleY);
    },

    onModified(event, item) {
      console.log("modified", event)
      //this.canvas.renderAll()
      //this.reloadOpenedTool()
      item.l = Math.round(event.target.left);
      item.t = Math.round(event.target.top);
      item.w = Math.round(event.target.width * event.target.scaleX);
      item.h = Math.round(event.target.height * event.target.scaleY);

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
