import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "../Login";
import { Provider } from "react-redux";
import store from "../../Redux/Store/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../Utils/theme";
import user from "@testing-library/user-event";

// Jest Testing for Login Page under Login.test.js

describe("Login Page Tests", () => {
  
  // Testing starts here

  test("Render Login Page with Two Input Field", async () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      </ChakraProvider>
    );

    const auidInput = screen.getByPlaceholderText(/Enter AUID/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Password/i);

    expect(auidInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("Render Login Page with and One Login Button", async () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      </ChakraProvider>
    );

    const loginButton = screen.queryByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("Render Login Page with Error Message when we don't enter anything.", async () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      </ChakraProvider>
    );
    const auidInput = screen.getByPlaceholderText(/Enter AUID/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
    user.type(auidInput, "");
    user.type(passwordInput, "");
    user.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/Valid AUID is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Valid password is required/i)
      ).toBeInTheDocument();
    });
  });

  test("Validate Input Fields aka less than 5 characters", async () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      </ChakraProvider>
    );
    const auidInput = screen.getByPlaceholderText(/Enter AUID/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
    user.type(auidInput, "12");
    user.type(passwordInput, "lol");
    user.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/Enter valid AUID/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must contain at least 5 characters./i)
      ).toBeInTheDocument();
    });
  });

  test("Validate Credentials from Server Side / AKA Invalid Credentials", async () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      </ChakraProvider>
    );
    const auidInput = screen.getByPlaceholderText(/Enter AUID/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
    user.type(auidInput, "AGS19ABACA072");
    user.type(passwordInput, "Praveen");
    user.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(
      () => {
        expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  // it("Validate Credentials from Server Side / AKA Correct Credentials", async () => {
  //   jest.useFakeTimers("legacy");
  //   render(
  //     <ChakraProvider theme={theme}>
  //       <Provider store={store}>
  //         <Router>
  //           <Login />
  //         </Router>
  //       </Provider>
  //     </ChakraProvider>
  //   );
  //   const auidInput = screen.getByPlaceholderText(/Enter AUID/i);
  //   const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  //   user.type(auidInput, "AGS19ABCA072");
  //   user.type(passwordInput, "Praveen8874@");
  //   user.click(screen.getByRole("button", { name: /login/i }));
  //   // Check if web page is redirecting to home page after giving correct
  //   // credentials
  //   await waitFor(
  //     () => {
  //       expect(screen.getByText(/Hi, Praveen/i)).toBeInTheDocument();
  //     },
  //     { timeout: 90000 }
  //   );
  // });
});
