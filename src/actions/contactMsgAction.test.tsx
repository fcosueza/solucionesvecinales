/**
 * @jest-environment node
 */

import contactMsgAction from "./contactMsgAction";
import { FormActionState } from "@/types";

describe("contactMsgAction test suite...", () => {
  it("Should return and error, with the corresponding errors if data is not correct", () => {
    const formData: FormData = new FormData();
    const prevState: FormActionState = { message: "" };
  });
});
