/*
 * Holds service parameters were read from environment variables
 */
module.exports = function() {
  // load parameters from environment variables or use default values
  this.load = function(variables) {
    let f = function(k, i) {
      const v = process.env[variables[k].env];
      if (v != 'undefined' && v){
        this[k] = v;
      } else {
        this[k] = variables[k].def;
      }
    };
    Object.keys(variables).map(f.bind(this));
  }
  //
  this.buildEndpoint = function(path, query = null, hash = null) {
    // TODO implement processing for query and hash
    const r = path.slice();
    r.unshift(`http://${this.host}:${this.port}`);
    return r.join('/');
  }
  //
  this.log = function() {
    console.log(`Component [${this.key}]`);
    console.log('Environment:');
    for(var n in this) {
      if (typeof this[n] !== "function") {
        console.log(`* ${n}: ${this[n]}`);
      }
    }
  }
};
