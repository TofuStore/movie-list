import React from 'react';

var WatchTab = (props) => {
  return (
    <>
      <button onClick={() => props.switchTab1()}>Watched</button>
      <button onClick={() => props.switchTab2()}>To Watch</button>
    </>
  )

}

export default WatchTab;