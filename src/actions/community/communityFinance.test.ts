import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { communityFinance, deleteRecord } from "./communityFinance";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  inscripcion: {
    findUnique: jest.fn()
  },
  registro: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("Suite de pruebas de communityFinance", () => {
  const createFormData = ({
    descripcion = "Factura ascensor",
    importe = "150.50",
    tipo = "gasto"
  }: {
    descripcion?: string;
    importe?: string;
    tipo?: string;
  }) => {
    const formData = new FormData();
    formData.append("descripcion", descripcion);
    formData.append("importe", importe);
    formData.append("tipo", tipo);
    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue({ usuario: "admin-1" });
  });

  it("No debe hacer nada si el usuario no esta autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await communityFinance(1, createFormData({}));

    expect(prisma.registro.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el usuario no es administrador", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: UserRole.tenant }
    });

    await communityFinance(1, createFormData({}));

    expect(prisma.registro.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el formulario es invalido", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    await communityFinance(0, createFormData({ descripcion: "", importe: "NaN", tipo: "otro" }));

    expect(prisma.registro.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si faltan campos en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    const formData = new FormData();

    await communityFinance(1, formData);

    expect(prisma.registro.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el usuario no esta inscrito en la comunidad", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue(null);

    await communityFinance(1, createFormData({}));

    expect(prisma.registro.create).not.toHaveBeenCalled();
  });

  it("Debe crear un registro y revalidar rutas si el usuario es admin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.registro.create as jest.Mock).mockResolvedValue({});

    await communityFinance(4, createFormData({ descripcion: "  Cuota mensual  ", importe: "300", tipo: "ingreso" }));

    expect(prisma.registro.create).toHaveBeenCalledWith({
      data: {
        comunidad: 4,
        descripcion: "Cuota mensual",
        importe: 300,
        tipo: "ingreso"
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/4/finanzas");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/4/overview");
  });

  it("Debe crear un registro si el usuario es webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.registro.create as jest.Mock).mockResolvedValue({});

    await communityFinance(2, createFormData({ tipo: "gasto" }));

    expect(prisma.registro.create).toHaveBeenCalled();
  });

  it("No debe lanzar error si prisma.create falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.registro.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(communityFinance(1, createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe("Suite de pruebas de deleteRecord", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si no hay sesion autenticada", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.append("id", "12");

    await deleteRecord(formData);

    expect(prisma.registro.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el rol no es webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.append("id", "12");

    await deleteRecord(formData);

    expect(prisma.registro.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el id es invalido", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.append("id", "NaN");

    await deleteRecord(formData);

    expect(prisma.registro.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Debe eliminar registro y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.registro.delete as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("id", "18");

    await deleteRecord(formData);

    expect(prisma.registro.delete).toHaveBeenCalledWith({ where: { id: 18 } });
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/finanzas");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("No debe lanzar error si prisma.delete falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.registro.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const formData = new FormData();
    formData.append("id", "18");

    await expect(deleteRecord(formData)).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
