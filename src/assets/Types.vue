<script>
//export const TYPES = {
class Prop {
  constructor(text, typ) {
    //(this.text, this.typ) = (text, typ);
    this.text = text;
    this.typ = typ;
  }
}

export class BaseElement {
  static count = 0;

  _id = -1; // wird im 'constructor()' gesetzt
  url = "/img/ui/button.png";

  t = 0; // Top
  l = 0; // Left
  w = 0; // Width
  h = 0; // Height

  constructor() {
    this._id = BaseElement.count++;
  }
  get id() {
    return "el-" + this._id;
  }

  //TMP
  get a() {
    return "el-" + this._id;
  }
  events = [];
  static typ = "but00";
  // props = [
  //   ['t', 0, 'int', 'Top'],
  //   ['l', 0, 'int', 'Left'],
  //   ['w', 0, 'int', 'Width'],
  //   ['h', 0, 'int', 'Height'],
  // ]

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      a[b] = this[b];
      return a;
    }, {});
    // return this.props.reduce((a, prop) => {
    //   a[prop[0]] = prop[1]; return a; }, {}); // not tested
  }
}

// export class Button extends BaseElement {
//   url = "/img/ui/button.png"
// }

// TODO: Standardwerte einfüheren, die auch automatisch gesetzt sind falls Wert = null (bzw 0?), etc.
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
  //num00: {name:'Numeric',    props: {l:["Left","int"],t:["Top","int"],w:["Width","int"],h:["Height","int"]},},
};

TYPES.install = function(Vue) {
  Vue.prototype.$UI = key => {
    return TYPES[key];
  }; // <- not yet used
  Vue.prototype.$PROPS = key => {
    return TYPES.hasOwnProperty(key) ? TYPES[key].props : {};
  };
};

export default TYPES;
</script>