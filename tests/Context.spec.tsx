import { render, renderHook } from "@testing-library/react";
import React from "react";

import {AppProvider, AppStore, useMfContext} from '../src';

const AppContext = (): JSX.Element => (
  <AppProvider>
    <div>Test</div>
  </AppProvider>
);

describe("Context", () => {
  describe("Provider", () => {
    it("AppProvider should render successfully", () => {
      const { baseElement } = render(<AppContext />);
      expect(baseElement).toMatchSnapshot();
      expect(baseElement).toBeTruthy();
    });
  });

  describe("AppStore", () => {
    it("Stores must be initialized correctly", () => {
      const { current } = renderHook(useMfContext).result;
      expect(current).toMatchObject(AppStore().rootStore.init());
    });
  });
});
