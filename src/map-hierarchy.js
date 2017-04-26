/**
 * Created by IvanP on 26.12.2016.
 */
export default class MapHierarchy {
  constructor(config) {
    this.declareGlobals(config,{
        normals: {},
        normalsSeparator: ',',
      },
      this.typeCheck(config)
    );

    if(this.flatHierarchy && !this.hierarchy){
      this.hierarchy=this.composeTreeHierarchy();
    } else if(!this.flatHierarchy && this.hierarchy){
      this.flatHierarchy = this.composeFlatHierarchy()
    }
    this.addMapIDsToHierarchyLevel();
    return {hierarchy:this.hierarchy, flatHierarchy:this.flatHierarchy}
  }

  declareGlobals(config, defaults = {}, typeCheck = {}) {
    const mixedOptions = {...config, ...defaults};
    Object.keys(mixedOptions).forEach(key => {
      if (typeCheck[key] && typeof typeCheck[key] === 'function') typeCheck[key](mixedOptions[key]);
      this[key] = mixedOptions[key];
    })
  }

  typeCheck(opts){
    if(opts.flatHierarchy){
      if(typeof opts.flatHierarchy !== 'object') throw new TypeError('"flatHierarchy" must be an Object but it is a '+ typeof opts.flatHierarchy);
      if(Object.keys(opts.flatHierarchy).length===0) console.error('flatHierarchy has no nodes in it');
    }

    if(opts.hierarchy){
      if(!Array.isArray(opts.hierarchy)) throw new TypeError('"hierarchy" must be an Array but it is a '+ typeof opts.hierarchy);
      if(opts.hierarchy.length===0) console.error('hierarchy has no nodes in it');
    }

    if(!opts.flatHierarchy && !opts.hierarchy)
      throw new Error('either "flatHierarchy" or "hierarchy" must be passed for map to work');

    return {
      normalsSeparator: function(){if(typeof opts.normalsSeparator !== 'string') throw new TypeError('"normalsSeparator" must be an String but it is a '+ typeof opts.normalsSeparator)}
    }
  }

  /**
   * Processes hierarchy array by assigning parent-child relations and returning those that don't have a parent
   * */
  composeTreeHierarchy() {
    let orphanItems = [];
    for (let key in this.flatHierarchy) {
      let item = this.flatHierarchy[key];
      this.normalize(item);
      if (this._itemHasParent(item)) {
        this._assignParentToItem(item);
      } else {
        orphanItems.push(item);
      }
    }
    return orphanItems
  }

  /**
   * normalizes a string value to a certain format.
   * - `arrayString` - normalizes comma-separated items to an Array of Strings, i.e "haha", "lala" would be ["haha", "lala"]
   * - `arrayNumber` - normalizes comma-separated items to an Array of Floats, i.e "-13.41", "48.66" would be [-13.41, 48.66]
   * - `string` - returns the string as is
   * - `number` - parses the string as a Float
   * - `boolean` - parses the string as a Boolean, case insensitive
   *
   * @param {Object} item - item to match contents against `normals`
   * */
  normalize(item) {
    if (this.shouldNormalize) {
      let parser = {
        stringArray: val => val.split(this.normalsSeparator),
        numberArray: val => val.split(this.normalsSeparator).map(i => parseFloat(i)),
        string: val => val.trim(),
        number: val => val !== null && !isNaN(parseFloat(val)) ? parseFloat(val) : null,
        boolean: val => val.toLowerCase() === "true" || val === "1"
      };

      for (let normal in this.normals) {
        if (item[normal]) {// property exists in object
          if (item[normal].length > 0) {
            item[normal] = parser[this.normals[normal]](item[normal])
          } else {
            delete item[normal]
          }
        }
      }
    }
  }

  _itemHasParent(item){
    return item.parent && item.parent !== null && item.parent.length > 0
  }

  _assignParentToItem(item){
    item.parent = this.flatHierarchy[item.parent];
    item.parent.subcells = item.parent.subcells || [];
    item.parent.subcells.push(item);
  }

  get shouldNormalize() {
    return Object.keys(this.normals).length > 0;
  }

  composeFlatHierarchy() {
    let flatHierarchy = {};
    const shouldNormalize = this.shouldNormalize;
    this.hierarchy.forEach(
      item => {
        if (shouldNormalize) this.normalize(item);
        flatHierarchy[item.id] = item;
      });
    return flatHierarchy;
  }

  /**
   * Updates initial hierarchy
   * @param hierarchy
   * @param parent - hierarchy level parent
   */
  addMapIDsToHierarchyLevel(hierarchy=this.hierarchy, parent = null) {
    hierarchy.forEach(subcell => {
      this.inheritMapName(subcell);
      if (subcell.subcells) {
        this.addMapIDsToHierarchyLevel(subcell.subcells, subcell);
      }
      this.bubbleMapId(subcell);
    });
  }

  inheritMapName(item){
    if (this.parentHasMapName(item)) {
      item.mapName = item.parent.mapName;
    }
  }

  bubbleMapId(item){
    if (item.parent && item.mapID && !item.parent.mapName) {
      if (!item.parent.mapID) item.parent.mapID = [];
      item.parent.mapID = item.parent.mapID.concat(item.mapID);
    }
  }

  parentHasMapName(item){
    return item.parent && item.parent !== null && item.parent.mapName
  }
}
