import React from 'react';
// componentMap.js
import RegistrationForm from './RegistrationForm'
import { RegistrationFormWrapper } from './RegistrationFormWrapper';
import TabsContainer from './TabsContainer';
import { TabsContainerWrapper } from './TabsWrapper';
import DynamicTabs from './DynamicTabs';
import TableGrid from '../../routes/home/components/PrimeReactDynamic';

const ComponentMap = {
  RegistrationForm: RegistrationForm,
  RegistrationFormWrapper: RegistrationFormWrapper,
  TabsContainer: TabsContainer,
  TabsContainerWrapper: TabsContainerWrapper,
  DynamicTabs: DynamicTabs,
  TableGrid:TableGrid,
}

export default ComponentMap;
