import { SessionPayload, UserRole } from "@/types";
import encryptSession from "./encryptSession";
import { SignJWT } from "jose";

jest.mock("jose", () => {
  return {
    SignJWT: jest.fn().mockImplementation(() => ({
      setProtectedHeader: jest.fn().mockReturnThis(),
      setIssuedAt: jest.fn().mockReturnThis(),
      setExpirationTime: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue("mocked.jwt.token")
    }))
  };
});

describe("encryptSession test suite...", () => {
  const payLoad: SessionPayload = { userID: "1", role: UserRole.tenant };
  const expDate: Date = new Date(Date.now() + 30000);

  it("Should cretate a token with protected header", async () => {
    await encryptSession(payLoad, expDate);

    expect(SignJWT).toHaveBeenCalled();
  });

  it("Should cretate a token with the specified expiration time", async () => {
    const mockInstance = (SignJWT as jest.Mock).mock.results[0].value;

    await encryptSession(payLoad, expDate);

    expect(mockInstance.setProtectedHeader).toHaveBeenCalledWith({ alg: "HS256" });
    expect(mockInstance.setIssuedAt).toHaveBeenCalled();
    expect(mockInstance.setExpirationTime).toHaveBeenCalledWith(expDate);
    expect(mockInstance.sign).toHaveBeenCalled();
  });

  it("Should return de mocked token", async () => {
    const token = await encryptSession(payLoad, expDate);

    expect(token).toBe("mocked.jwt.token");
  });
});
