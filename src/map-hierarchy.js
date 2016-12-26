/**
 * Created by IvanP on 26.12.2016.
 */

class MapHierarchy {
  constructor(hierarchy,normals,normalsSeparator){
    //this.aHierarchy = hierarchy;
    this.flatHierarchy = this.constructor.composeFlatHierarchy(hierarchy,normals,normalsSeparator);
    this.hierarchy = this.constructor.processHierarchy(this.flatHierarchy);
    this.constructor.addMapIDsToHierarchyLevel(this.hierarchy);
  }

  /**
   * Processes hierarchy array by assigning parent-child relations and returning those that don't have a parent
   * @param {Object} flatHierarchy - a flat hierarchy object with ids as keys
   * */
  static processHierarchy(flatHierarchy){
    let orphans = [];
    for(let key in flatHierarchy){
      let item = flatHierarchy[key];

      // map item to parent
      if(item.parent && item.parent!=null && item.parent.length>0){
        item.parent = flatHierarchy[item.parent];
        item.parent.subcells = item.parent.subcells || [];
        item.parent.subcells.push(item);
      } else {
        orphans.push(item);
      }
    }
    return orphans
  }

  static composeFlatHierarchy(hierarchy,normals){
    let o={};
    let toNormalize = normals.keys().length>0;
    hierarchy.forEach(
      item=>{
        if(toNormalize)MapHierarchy.normalize(item,normals);
        o[item.id]=item;
      });
    return o;
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
   * @param {Object} [normals={}] - an object where keys myst coincide with column ids (thus be identical to keys in `item`). `normals` doesn't require for all keys from `item` to be present, only those that need to be normalised to a different type
   * @param {String} [separator=','] - a separator array items are serialized with, by default it's a comma (`,`)
   * */
  static normalize(item,normals={},separator=','){
    let parser = {
      arrayString: val => val.split(separator),
      arrayNumber: val => val.split(separator).map(i=>parseFloat(i)),
      string: val => val.trim(),
      number: val => val!=null && !isNaN(parseFloat(val))? parseFloat(val): null,
      boolean: val => val.toLowerCase()=="true" || val=="1"
    };
    for(let normal in normals){
      if(item[normal]){ // property exists in object
        if(item.length>0){
          parser[normals[normal]](item[normal])
        } else {
          delete item[normal]
        }
      }
    }
  }


  /**
   * Updates initial hierarchy
   * @param hierarchy
   * @param parent - hierarchy level parent
   */
  static addMapIDsToHierarchyLevel(hierarchy, parent = null) {
    hierarchy.forEach(subcell => {
      //subcell.parent = parent;
      //subcell.value = Math.random()*100;
      if(subcell.parent && subcell.parent!=null && subcell.parent.mapName){
        subcell.mapName = subcell.parent.mapName;
      }
      if (subcell.subcells) {
        MapHierarchy.addMapIDsToHierarchyLevel(subcell.subcells, subcell);
      }
      if(subcell.parent && subcell.mapID && !subcell.parent.mapName){
        if(!subcell.parent.mapID)
          subcell.parent.mapID = [];
        subcell.parent.mapID = subcell.parent.mapID.concat(subcell.mapID);
      }
    });
  }

}
export default MapHierarchy
