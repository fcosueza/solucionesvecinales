import { FormActionState } from "@/types";
import logInAction from "./logInAction";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

jest.mock("@/lib/prisma", () => ({
  user: {
    findUnique: jest.fn()
  }
}));

describe("logInAction test suite", () => {
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
      email: "not-an-email@gmail.c",
      password: "aaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Incorrect form data");
    expect(result.errors).toBeDefined();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("Should return an error if the user doesn't exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue("");

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Incorrect form data");
    expect(result.errors?.email).toBe("No existe ningún usuario con ese correo");
  });

  it("Should return an error if the password doesn't match", async () => {
    const hashedPassword = await bcrypt.hash("testestestestestestest", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      credentials: { password: hashedPassword }
    });

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Incorrect form data");
    expect(result.errors?.password).toBe("La contraseña no es válida para este usuario.");
  });

  it("Should return success if the user exists and password is correct", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      credentials: { password: hashedPassword }
    });

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("User and password are correct");
  });
});
