import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import axios from "axios";
import { act } from "react-dom/test-utils";

import App from "../App";
import { mockMovies, mockNoResults, mockResults } from "../mocks/MockMovies";

jest.mock("axios");

describe("Main application", () => {
  describe("Setup", () => {
    it("loads the app successfully", () => {
      render(<App />);
      expect(screen.getByText("Movie Search")).not.toBeNull();
      expect(
        screen.getByRole("textbox", { name: "search-field" })
      ).not.toBeNull();
    });
  });

  describe("Searching a movie", () => {
    it("loads data with a valid search", async () => {
      axios.get.mockResolvedValueOnce(mockResults);

      render(<App />);

      const searchField = screen.getByRole("textbox", { name: "search-field" });
      act(() => fireEvent.change(searchField, { target: { value: "Movie" } }));

      // Ensures the promises triggered from input change are awaited
      await waitFor(() => {
        // Asserts that each mock movie's title now exists in the DOM
        for (const mockMovie of mockMovies) {
          expect(screen.queryByText(mockMovie.title)).not.toBeNull();
        }
      });
    });

    it("displays a warning if no results are found", async () => {
      axios.get.mockResolvedValueOnce(mockNoResults);

      render(<App />);
      const searchField = screen.getByRole("textbox", { name: "search-field" });

      act(() =>
        fireEvent.change(searchField, { target: { value: "Invalid Search" } })
      );

      const noResultsComponent = await screen.findByText("No results found.");

      await waitFor(() => {
        const moviesResults = screen.getByLabelText("movies-results");
        expect(moviesResults.children.length).toEqual(0);
        expect(noResultsComponent).not.toEqual({});
      });
    });

    it("displays an error message if a search triggers an error", async () => {
      axios.get.mockRejectedValueOnce(new Error("This is an error"));

      render(<App />);
      const searchField = screen.getByRole("textbox", { name: "search-field" });

      act(() =>
        fireEvent.change(searchField, {
          target: { value: "Should throw an error" },
        })
      );

      const errorComponent = await screen.findByText(
        "An error occurred while fetching movies."
      );

      await waitFor(() => {
        const moviesResults = screen.getByLabelText("movies-results");
        expect(moviesResults.children.length).toEqual(0);
        expect(errorComponent).not.toEqual({});
      });
    });
  });
});
