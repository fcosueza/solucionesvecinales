import reviewCommunityRequest from "./reviewCommunityRequest";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));

const txMock = {
  $queryRaw: jest.fn(),
  $executeRaw: jest.fn(),
  inscripcion: {
    upsert: jest.fn()
  }
};

jest.mock("@/lib/prisma", () => ({
  comunidad: {
    findUnique: jest.fn()
  },
  $transaction: jest.fn(async callback => callback(txMock))
}));

describe("Suite de pruebas de reviewCommunityRequest", () => {
  const createFormData = ({
    communityID = "1",
    requestID = "101",
    decision = "approve"
  }: {
    communityID?: string;
    requestID?: string;
    decision?: "approve" | "reject";
  }) => {
    const formData = new FormData();

    formData.append("communityID", communityID);
    formData.append("requestID", requestID);
    formData.append("decision", decision);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si el usuario no está autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await reviewCommunityRequest(createFormData({}));

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("No debe permitir revisión si el usuario no administra la comunidad", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminID: "admin-2" });

    await reviewCommunityRequest(createFormData({}));

    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(txMock.$executeRaw).not.toHaveBeenCalled();
  });

  it("Debe aprobar solicitud pendiente y crear inscripción", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminID: "admin-1" });
    txMock.$queryRaw.mockResolvedValue([{ estado: "pendiente", usuario: "user-1" }]);

    await reviewCommunityRequest(createFormData({ decision: "approve" }));

    expect(txMock.$executeRaw).toHaveBeenCalled();
    expect(txMock.inscripcion.upsert).toHaveBeenCalledWith({
      where: {
        usuario_comunidad: {
          usuario: "user-1",
          comunidad: 1
        }
      },
      update: {},
      create: {
        usuario: "user-1",
        comunidad: 1
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/solicitudes");
  });

  it("Debe denegar solicitud pendiente sin crear inscripción", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminID: "admin-1" });
    txMock.$queryRaw.mockResolvedValue([{ estado: "pendiente", usuario: "user-1" }]);

    await reviewCommunityRequest(createFormData({ decision: "reject" }));

    expect(txMock.$executeRaw).toHaveBeenCalled();
    expect(txMock.inscripcion.upsert).not.toHaveBeenCalled();
  });

  it("No debe cambiar solicitud si no está pendiente", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminID: "admin-1" });
    txMock.$queryRaw.mockResolvedValue([{ estado: "aprobada", usuario: "user-1" }]);

    await reviewCommunityRequest(createFormData({ decision: "approve" }));

    expect(txMock.$executeRaw).not.toHaveBeenCalled();
    expect(txMock.inscripcion.upsert).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si los datos del formulario no son válidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    await reviewCommunityRequest(createFormData({ communityID: "abc", requestID: "-1" }));

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si la decisión no es válida", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    const formData = new FormData();
    formData.append("communityID", "1");
    formData.append("requestID", "101");
    formData.append("decision", "maybe");

    await reviewCommunityRequest(formData);

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el campo decision es null", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    const formData = new FormData();
    formData.append("communityID", "1");
    formData.append("requestID", "101");
    // decision not appended → formData.get("decision") returns null

    await reviewCommunityRequest(formData);

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
