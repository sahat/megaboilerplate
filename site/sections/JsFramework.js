import React from 'react';
import cx from 'classnames';
import { capitalize } from 'lodash/string';

const JS_FRAMEWORK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 50 50">
    <path d="M 29.125 7.34375 L 17.125 41.34375 L 20.875 42.65625 L 32.875 8.65625 L 29.125 7.34375 z M 9.9375 13.375 L 1.25 23.71875 L 0.1875 25 L 1.25 26.28125 L 9.9375 36.65625 L 13.03125 34.09375 L 5.40625 25 L 13 15.9375 L 9.9375 13.375 z M 40.0625 13.375 L 37 15.9375 L 44.59375 25 L 37 34.0625 L 40.09375 36.625 L 48.71875 26.28125 L 49.78125 25 L 48.71875 23.71875 L 40.0625 13.375 z" color="#000" overflow="visible"></path>
  </svg>
);

class JsFramework extends React.Component {
 render() {
   let props = this.props;
   let description;
   let jsFrameworkOptions;

   switch (props.jsFramework) {
     case 'react':
       description = (
         <div>
           <strong><a href="https://facebook.github.io/react/" target="_blank">React</a></strong> — A  Library for building UIs. Advantages: simple, declarative, composable components, Virtual DOM, one-way reactive data-flow.
         </div>
       );
       jsFrameworkOptions = (
         <div className="panel-collapse">
           <div className="checkbox">
             <label cl>
               <input type="checkbox" name="reactOptionsCheckboxes" value="redux" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('redux')} />
               <span className="hint--top hint--rounded" data-hint="Predictable state container for JavaScript apps. Redux is an evolution of the Facebook's Flux, without all the complexity.">Redux</span>
             </label>
           </div>
           <div className="checkbox">
             <label>
               <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('reactRouter')} />
               <span className="hint--top hint--rounded" data-hint="A complete routing library for React. React Router keeps your UI in sync with the URL.">React Router</span>
             </label>
           </div>
           <div className="checkbox">
             <label>
               <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('graphql')} />
               <span className="hint--top hint--rounded" data-hint="Relay is a framework from Facebook that provides data-fetching functionality for React applications.">GraphQL + Relay</span>
             </label>
           </div>
           <div className="checkbox">
             <label>
               <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('es6')} />
               <span className="hint--top hint--rounded" data-hint="ECMAScript 2015 (ES6) is the upcoming sixth major release of the ECMAScript language specification.">ES6</span>
             </label>
           </div>
           <div className="checkbox">
             <label>
               <input type="checkbox" name="reactOptionsCheckboxes" value="hotReload" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('hotReload')} />
               <span className="hint--top hint--rounded" data-hint="Tweak React components in real time, while preserving the state.">React Hot Reload</span>
             </label>
           </div>
         </div>
       );
       break;
     case 'angular':
       description = (
         <div>
           <strong><a href="https://angular.io/" target="_blank">Angular 2</a></strong> — A JavaScript framework for building web apps. Advantages: feature-rich, big community, two-way data binding, MVC architecture.
         </div>
       );
       jsFrameworkOptions = null;
       break;
     default:
       description = <div className="placeholder"> </div>;
       jsFrameworkOptions = null;
   }

   let optionsClasses = cx("nav nav-stacked", {
     fadeIn: props.jsFramework && props.jsFramework !== 'none',
     animated: props.jsFramework && props.jsFramework !== 'none',
     invisible: !props.jsFramework || props.jsFramework === 'none'
   });

   const recommended = props.beginner ? (
     <span className="hint--top hint--rounded" data-hint="Recommended">
        <img src="/img/svg/recommended.svg" alt="Recommended" />
      </span>
   ) : null;

   return (
     <div className={cx('zoomInBackwards panel', props.jsFramework)}>
       <div className="panel-heading">
         <h6>{JS_FRAMEWORK_SVG}{!props.jsFramework || props.jsFramework === 'none' ? 'JavaScript Framework' : props.jsFramework}</h6>
         <a href="#" className="stats-icon hint--top hint--rounded" data-hint="Download Stats">
           <i className="fa fa-bar-chart" />
         </a>
       </div>
       <div className="panel-body">
         {description}
         <div className="radio-group">
           <label className="radio-inline">
             <img className="btn-logo" src="/img/svg/none.png" alt="None" />
             <input type="radio" name="jsFrameworkRadios" value="none" onChange={props.handleChange} checked={props.jsFramework === 'none'} />
             <span>None</span>
             {recommended}
           </label>
           <label className="radio-inline">
             <img className="btn-logo" src="/img/svg/react-logo.svg" alt="React" />
             <input type="radio" name="jsFrameworkRadios" value="react" onChange={props.handleChange} checked={props.jsFramework === 'react'} />
             <span>React</span>
           </label>
           <label className="radio-inline">
             <img className="btn-logo" src="/img/svg/angular2.png" alt="Angular" />
             <input type="radio" name="jsFrameworkRadios" value="angular" onChange={props.handleChange} checked={props.jsFramework === 'angular'} />
             <span>Angular 2</span>
           </label>
         </div>

         <ul className={optionsClasses}>
           <li>
             <a data-toggle="collapse" href="#jsFrameworkCollapse1">
               <img className="options-icon animated" src="/img/svg/options.svg"/>
               {`Additional Options for ${capitalize(props.jsFramework)}`}
             </a>
             <div id="jsFrameworkCollapse1" className="collapse">
               {jsFrameworkOptions}
             </div>
           </li>
         </ul>
       </div>
     </div>
   );
 }
}

export default JsFramework;
