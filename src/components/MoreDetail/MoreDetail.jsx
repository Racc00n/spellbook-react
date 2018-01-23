import React from 'react';
const styles = {
  root: {
    cursor: 'pointer'
  }
}
const moreDetail = ({ text }) => {  
  return (
    <div className="btn-xs btn-primary" style={styles.root} onClick={() => alert(text)}>
      <i 
        className="fas fa-ellipsis-h" 
        aria-hidden="true"        
      ></i>
    </div>
  );
}

export default moreDetail;