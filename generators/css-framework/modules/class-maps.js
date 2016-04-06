// Base (No CSS Framework)
export const noneClassMap = {
  // Grid
  row: '',
  col4: '',
  fluidContainer: '',
  container: '',

  // Buttons
  defaultButton: '',

  // Components
  panel: '',
  panelHeading: 'panel-heading',
  panelTitle: 'panel-title',
  panelBody: ''
};

// Bootstrap
export const bootstrapClassMap = Object.assign({}, noneClassMap, {
  // Grid
  row: 'row',
  col2: 'col-sm-2',
  col4: 'col-sm-4',
  col8: 'col-sm-8',
  col2OffsetCol8: "col-sm-offset-2 col-sm-8",
  fluidContainer: 'container-fluid',
  container: 'container',

  // Buttons
  defaultButton: 'btn btn-default',
  successButton: 'btn btn-success',
  
  // Forms
  horizontalForm: 'form-horizontal',
  formGroup: 'form-group',
  formInput: 'form-control',

  // Components
  panel: 'panel',
  panelHeading: 'panel-heading',
  panelTitle: 'panel-title',
  panelBody: 'panel-body'
});

// Foundation
export const foundationClassMap = Object.assign({}, noneClassMap, {

});

// Bourbon Neat
export const bourbonNeatClassMap = Object.assign({}, noneClassMap, {

});
