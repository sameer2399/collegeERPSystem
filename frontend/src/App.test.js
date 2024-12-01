import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(
    /Become a member and start building the next big thing together./i
  );
  expect(linkElement).toBeInTheDocument();
});

