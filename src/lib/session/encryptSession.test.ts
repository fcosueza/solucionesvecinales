/**
 * @jest-environment node
 */

import { SessionPayload, UserRole } from "@/types";
import encryptSession from "./encryptSession";
import { SignJWT } from "jose";

describe("encryptSession test suite...", () => {
  it("Should cretate a token with protected header", async () => {
    const payLoad: SessionPayload = { userID: "1", role: UserRole.tenant };
    const expDate: Date = new Date(Date.now() + 30000);
    const setProtectedHeader = jest.spyOn(SignJWT.prototype, "setProtectedHeader");

    await encryptSession(payLoad, expDate);

    expect(setProtectedHeader).toHaveBeenCalled();
  });

  it("Should cretate a token with the specified expiration time", async () => {
    const payLoad: SessionPayload = { userID: "1", role: UserRole.tenant };
    const expDate: Date = new Date(Date.now() + 30000);
    const setExpirationTime = jest.spyOn(SignJWT.prototype, "setExpirationTime");

    await encryptSession(payLoad, expDate);

    expect(setExpirationTime).toHaveBeenCalledWith(expDate);
  });

  it("Should cretate a token signed", async () => {
    const payLoad: SessionPayload = { userID: "1", role: UserRole.tenant };
    const expDate: Date = new Date(Date.now() + 30000);
    const sign = jest.spyOn(SignJWT.prototype, "sign");

    await encryptSession(payLoad, expDate);

    expect(sign).toHaveBeenCalled();
  });
});
