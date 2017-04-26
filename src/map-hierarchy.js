/**
 * Created by IvanP on 26.12.2016.
 */
export default class MapHierarchy {
  constructor(flatHierarchy, normals = {}, normalsSeparator = ',') {
    this.flatHierarchy = flatHierarchy;
    this.normals = normals;
    this.normalsSeparator = normalsSeparator;
    this.hierarchy = this.processHierarchy();
    this.addMapIDsToHierarchyLevel();
    return this.hierarchy
  }

  /**
   * Processes hierarchy array by assigning parent-child relations and returning those that don't have a parent
   * */
  processHierarchy() {
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

  static composeFlatHierarchy(hierarchy, normals) {
    let o = {};
    let toNormalize = normals.keys().length > 0;
    hierarchy.forEach(
      item => {
        if (toNormalize) MapHierarchy.normalize(item, normals);
        o[item.id] = item;
      });
    return o;
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
