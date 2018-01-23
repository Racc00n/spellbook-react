import React from 'react';

const NumberPicker = ({min, max, value, disabled, change})=> {
  const styles = {
    root: {
      minWidth: '7rem'
    },
    disabled: {
      opacity: 0,
      pointerEvents: 'none'
    },
    enabled: {
      color: '#007bff',
      cursor: 'pointer'
    },
    span: {  
      lineHeight: '2rem',
      fontSize: '1.5rem',
      marginRight: '0.2rem',
      marginLeft: '0.2rem',
      verticalAlign: 'top',
      userSelect: 'none'
    }
  }

  return (
    <div style={styles.root}>
        <span hidden={disabled} 
              onClick={(event) => change(value - 1)}
              style={value <= min ? styles.disabled : styles.enabled } >
          <i className="fa fa-2x fa-minus-circle"></i>            
        </span>
        <span style={styles.span}>{value}</span>
        <span hidden={disabled}
              style={value >= max ? styles.disabled : styles.enabled}
              onClick={(event) => change(value + 1)} >
          <i className="fa fa-2x fa-plus-circle"></i>
        </span>
    </div>  
  );

  
}

export default NumberPicker;