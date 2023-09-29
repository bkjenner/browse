import React from 'react';
// componentMap.js
// import * as components from './index.js';
// import { RegistrationForm, Foo } from './index.js';
import RegistrationForm from './RegistrationForm'
import { RegistrationFormWrapper } from './RegistrationFormWrapper';
// import { Foo } from './index.js';
// import Foo from './foo';
import TabsContainer from './TabsContainer';
import { TabsContainerWrapper } from './TabsWrapper';

const ComponentMap = {
  RegistrationForm: RegistrationForm,
  RegistrationFormWrapper: RegistrationFormWrapper,
  TabsContainer: TabsContainer,
  TabsContainerWrapper: TabsContainerWrapper,
}

export default ComponentMap;
