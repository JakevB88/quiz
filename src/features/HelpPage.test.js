import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import HelpPage from './HelpPage';

//Mock pages to test routing and layout
jest.mock("../features/HomePage", () => () => <div>Home Page</div>);

//Mock images with strings as jest can not deal with immages
jest.mock("../images/homepage-icon.png", () => "home.png");
jest.mock("../images/question-inquiry-icon.png", () => "help.png");


describe("HelpPage layout", () => {
  it("renders HelpPage and checks content", () => {
    render(<HelpPage />);

    expect(
        screen.getByRole("heading", { name: /helppage/i })
    ).toBeInTheDocument();
    expect(
        screen.getByText("Quiz application")
    ).toBeInTheDocument();
    
    expect(
        screen.getByText(/fill in the blanks/i)
    ).toBeInTheDocument();

  });


});
