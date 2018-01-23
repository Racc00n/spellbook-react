import React from 'react';
const styles = {
  root: {
    cursor: 'pointer'
  }
}
const moreDetail = ({ text }) => {  
  return (
    <div style={styles.root} onClick={() => alert(text)}>
      <i 
        className="fa fa-ellipsis-h btn-sm" 
        aria-hidden="true"        
      ></i>
    </div>
  );
}

export default moreDetail;