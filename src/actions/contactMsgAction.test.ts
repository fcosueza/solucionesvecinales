import { FormActionState } from "@/types";
import contactMsgAction from "./contactMsgAction";
import prisma from "../lib/prisma";

jest.mock("../lib/prisma", () => ({
  contacto: {
    create: jest.fn()
  }
}));

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
    expect(prisma.contacto.create).not.toHaveBeenCalled();
  });

  it("Should return an error if prisma can`t create message", async () => {
    (prisma.contacto.create as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    const formData = mockFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hello, this is a simple test for contactMsgAction server action"
    });

    const result = await contactMsgAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Message can't be created");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Should return success if the msg has been created correctly", async () => {
    (prisma.contacto.create as jest.Mock).mockResolvedValueOnce({ id: 1 });

    const formData = mockFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hello, this is a simple test for contactMsgAction server action"
    });

    const result = await contactMsgAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Message created successfully");
    expect(prisma.contacto.create).toHaveBeenCalledWith({
      data: {
        nombre: "John Doe",
        correo: "john@example.com",
        mensaje: "Hello, this is a simple test for contactMsgAction server action"
      }
    });
  });
});
