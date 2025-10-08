import { jwtVerify } from "jose";
import decryptSession from "./decryptSession";
import { SessionPayload, UserRole } from "@/types";

jest.mock("jose", () => ({
  jwtVerify: jest.fn()
}));

describe("decryptSession test suite...", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Should return the payload if the token is correct", async () => {
    const mockPayload: SessionPayload = { userID: "123", role: UserRole.tenant };

    (jwtVerify as jest.Mock).mockResolvedValueOnce({ payload: mockPayload });

    const result = await decryptSession("valid.token.here");

    expect(jwtVerify).toHaveBeenCalledWith("valid.token.here", expect.anything(), { algorithms: ["HS256"] });
    expect(result).toEqual(mockPayload);
  });

  it("Should return an error if jwtVerify throw an exception", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("Invalid token"));

    const result = await decryptSession("invalid.token.here");

    expect(result).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });

  it("Should return an error if the tokne is empty", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("No token provided"));

    const result = await decryptSession(undefined);

    expect(jwtVerify).toHaveBeenCalled();
    expect(result).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });
});
