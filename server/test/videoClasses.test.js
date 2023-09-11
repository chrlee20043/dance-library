/**
 * @jest-environment jsdom
 */

// test createVideoClass

const db = require("./db");
const { createVideoClass } = require("./videoClasses");

jest.mock("./db");

describe("createVideoClass", () => {
  it("should create a new class in the database", async () => {
    const mockNewVideoId = 1;
    db.query.mockResolvedValue((rows: [{ id: mockNewVideoId }]));
  });
});
