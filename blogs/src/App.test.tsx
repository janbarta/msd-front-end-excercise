import App from "./App";
import ReactDOM from "react-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { PublishedPost } from "./pages/PublishedPost";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Renders post list", () => {
  // Tests will go here using `it` blocks
  it("display list of posts", () => {
    const wrapper = mount(<PublishedPost />);
    expect(wrapper.find(".post")).toHaveLength(2);
  });
});

//API tests can be implemented by mocking the useEffect and fetch operations.
