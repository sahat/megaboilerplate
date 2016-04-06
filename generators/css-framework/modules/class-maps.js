// Base (No CSS Framework)
export const noneClassMap = {
  // Grid
  row: '',
  col4: '',
  fluidContainer: '',

  // Buttons
  defaultButton: '',

  // Components
  panel: '',
  panelBody: ''
};

// Bootstrap
export const bootstrapClassMap = Object.assign({}, noneClassMap, {
  // Grid
  row: 'row',
  col4: 'col-sm-4',
  fluidContainer: 'container-fluid',

  // Buttons
  defaultButton: 'button default',

  // Components
  panel: 'panel',
  panelBody: 'panel-body'
});

// Foundation
export const foundationClassMap = Object.assign({}, noneClassMap, {

});

// Bourbon Neat
export const bourbonNeatClassMap = Object.assign({}, noneClassMap, {

});
