import React, { createContext, useContext, useState } from 'react';

const TabContainerContext = createContext();

export const TabContainerCon = ({ children }) => {
  const [tabs, setTabs] = useState([
    {
      label: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      label: 'Tab 2',
      content: <p>This is Tab 2's content.</p>,
    },
  ]);
  // Function to increment the count

  const addNewTab = (props) => {
    setTabs(
        [...tabs,
            props
        ]
    )
  }

  return (
    <TabContainerContext.Provider value={{ addNewTab }}>
      {children}
    </TabContainerContext.Provider>
  );
};

export const useTabContainerContext = () => {
  return useContext(TabContainerContext);
};
