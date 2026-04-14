import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from './App';

//Mock pages to test routing and layout
jest.mock("../features/HomePage", () => () => <div>Home Page</div>);
jest.mock("../features/QuestionsPage", () => () => <div>Questions Page</div>);
jest.mock("../features/HelpPage", () => () => <div>Help Page</div>);
jest.mock("../features/ResultsPage", () => () => <div>Results Page</div>);

//Mock images with strings as jest can not deal with immages
jest.mock("../images/homepage-icon.png", () => "home.png");
jest.mock("../images/question-inquiry-icon.png", () => "help.png");


//group the test for App.js together using "describe"
describe("App routing and layout", () => {
  it("renders header and HomePage by default", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Science Quiz/i })    ).toBeInTheDocument(); //test to see the header h1 is rendered correctly

    expect(
      screen.getByText("Home Page")).toBeInTheDocument();//test to see if the mocked "Home Page" is rendered in the DOM
  });

  it("navigates to HelpPage when help icon is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const helpIcon = screen.getByAltText("help");
    await user.click(helpIcon);

    expect(screen.getByText("Help Page")).toBeInTheDocument();
  });

  it("navigates back to HomePage when home icon is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    // go to help page first
    const helpIcon = screen.getByAltText("help");
    await user.click(helpIcon);
    expect(screen.getByText("Help Page")).toBeInTheDocument();

    // then go home
    const homeIcon = screen.getByAltText("home");
    await user.click(homeIcon);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
