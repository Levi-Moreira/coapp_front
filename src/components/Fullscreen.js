import React  from 'react';
import ReactDOM from 'react-dom';


export function Fullscreen(props) {
  var children = props.children,
      color = props.color;

  var styles = {
    backgroundColor: color,
    width: '100%',
    height: '100%'
  };

  return (
    <div style={styles}>
      {children}
    </div>
  );
}
