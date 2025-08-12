import { FormActionState } from "@/types";
import contactMsgAction from "./contactMsgAction";

jest.mock("../lib/prisma", () => ({
  contact: {
    create: jest.fn()
  }
}));

import prisma from "../lib/prisma";

describe("contactMsgAction test suite", () => {
  const mockFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });
    return fd;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an error if validation fails", async () => {
    const formData = mockFormData({
      name: "a",
      email: "not-an-email@gmail.c",
      msg: "aaa"
    });

    const result = await contactMsgAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Incorrect form data");
    expect(result.errors).toBeDefined();
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  it("Should return an error if prisma can`t create message", async () => {
    (prisma.contact.create as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    const formData = mockFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hello, this is a simple test for contactMsgAction server action"
    });

    const result = await contactMsgAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Message cant't be created");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Should return success if the msg has been created correctly", async () => {
    (prisma.contact.create as jest.Mock).mockResolvedValueOnce({ id: 1 });

    const formData = mockFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hello, this is a simple test for contactMsgAction server action"
    });

    const result = await contactMsgAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Message created successfully");
    expect(prisma.contact.create).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a simple test for contactMsgAction server action"
      }
    });
  });
});
