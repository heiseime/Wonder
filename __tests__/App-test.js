import * as React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));


describe('App', () => {
  jest.useFakeTimers();

  it.skip(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
