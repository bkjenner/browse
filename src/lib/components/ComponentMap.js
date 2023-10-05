import React from 'react';
// componentMap.js
import RegistrationForm from './RegistrationForm'
import { RegistrationFormWrapper } from './RegistrationFormWrapper';
import TabsContainer from './TabsContainer';
import { TabsContainerWrapper } from './TabsWrapper';
import DynamicTabs from './DynamicTabs';

const ComponentMap = {
  RegistrationForm: RegistrationForm,
  RegistrationFormWrapper: RegistrationFormWrapper,
  TabsContainer: TabsContainer,
  TabsContainerWrapper: TabsContainerWrapper,
  DynamicTabs: DynamicTabs,
}

export default ComponentMap;
