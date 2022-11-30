import React from 'react';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/300.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/700.css';

Meteor.startup(() => {
  const container = document.getElementById('app');
  const root = createRoot(container!);
  root.render(<App />);
});
