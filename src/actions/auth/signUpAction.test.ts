import { FormActionState } from "@/types";
import signUpAction from "./signUpAction";

jest.mock("../../lib/prisma", () => ({
  user: {
    create: jest.fn()
  },
  credentials: {
    create: jest.fn()
  }
}));

import prisma from "../../lib/prisma";

describe("signUpAction test suite", () => {
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
      email: "test@email.c",
      role: "failrole",
      name: "a",
      surname: "a",
      password: "aa",
      repeat: "a"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Incorrect form data");
    expect(result.errors).toBeDefined();
    expect(prisma.credentials.create).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("Should return an error if prisma can't create user", async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue({
      e: {
        message: "Can`t create user"
      }
    });

    const formData = mockFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("User can't be created");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Should return an error if prisma can't create credentials", async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.credentials.create as jest.Mock).mockRejectedValue({
      e: {
        message: "Can`t create credentials"
      }
    });

    const formData = mockFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Credentials can`t be created");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Should return success if the msg has been created correctly", async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.credentials.create as jest.Mock).mockResolvedValue({ id: 1 });

    const formData = mockFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("User created");
    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.credentials.create).toHaveBeenCalled();
  });
});
