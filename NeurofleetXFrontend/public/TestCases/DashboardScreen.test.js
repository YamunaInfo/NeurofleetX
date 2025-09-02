import { render, screen } from "@testing-library/react";
import DashboardScreen from "./dashboard_screen";

test("renders dashboard header", () => {
  render(<DashboardScreen />);
  expect(screen.getByText(/smartnav dashboard/i)).toBeInTheDocument();
});

test("renders map component", () => {
  render(<DashboardScreen />);
  expect(screen.getByTestId("map-widget")).toBeInTheDocument();
});
