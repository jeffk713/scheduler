import { useState } from 'react';

export default initialMode => {
  const [history, setHistory] = useState([initialMode]);

  //back to previous mode
  const back = () => {
    if (history.length > 1) {
      //remove the last item in history and set
      setHistory(prevState => {
        return prevState.slice(0, prevState.length - 1);
      });
    }
  };

  //change mode
  // const transition = (newMode, replace) => {
  //   if (replace) {
  //     back();
  //   }
  //   //add an item to hisotry and set
  //   setHistory(prev => [...prev, newMode]);
  // };

  const mode = history[history.length - 1];

  return { mode, transition, back };
};
