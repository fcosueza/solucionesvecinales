import { jwtVerify } from "jose";
import decodeSession from "./decodeSession";
import { SessionPayload, UserRole } from "@/types";

jest.mock("jose", () => ({
  jwtVerify: jest.fn()
}));

describe("decodeSession test suite", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return the payload if the token is valid", async () => {
    const mockPayload: SessionPayload = { userID: "123", role: UserRole.tenant };

    (jwtVerify as jest.Mock).mockResolvedValueOnce({ payload: mockPayload });

    const result = await decodeSession("valid.token.here");

    expect(jwtVerify).toHaveBeenCalledWith("valid.token.here", expect.anything(), { algorithms: ["HS256"] });
    expect(result).toEqual(mockPayload);
  });

  it("should return an error if jwtVerify throws an exception", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("Invalid token"));

    const result = await decodeSession("invalid.token.here");

    expect(result).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });

  it("should return an error if the token is empty", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("No token provided"));

    const result = await decodeSession(undefined);

    expect(jwtVerify).toHaveBeenCalled();
    expect(result).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });
});
