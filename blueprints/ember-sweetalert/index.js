module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('sweetalert2', '^6.1.0');
  }
};
