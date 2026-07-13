import { mkdtempSync, mkdirSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { saveImage } from "./saveImage";

describe("saveImage function test suite", () => {
  let tempRoot: string;
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    tempRoot = mkdtempSync(join(tmpdir(), "save-image-"));
    cwdSpy = jest.spyOn(process, "cwd").mockReturnValue(tempRoot);
  });

  afterEach(() => {
    cwdSpy.mockRestore();
    rmSync(tempRoot, { recursive: true, force: true });
  });

  it("Returns an error when no file is provided", async () => {
    await expect(saveImage({ size: 0 } as any, 1, "profiles")).resolves.toEqual({
      error: "no_file_provided",
      message: "No file provided"
    });
  });

  it("Returns an error when the file is empty", async () => {
    const file = new File([], "empty.png", { type: "image/png" });

    await expect(saveImage(file, 1, "profiles")).resolves.toEqual({
      error: "no_file_provided",
      message: "No file provided"
    });
  });

  it("Returns an error for unsupported image types", async () => {
    const file = new File(["not an image"], "note.txt", { type: "text/plain" });

    await expect(saveImage(file, 1, "profiles")).resolves.toEqual({
      error: "invalid_image_type",
      message: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF."
    });
  });

  it("Returns an error when the file is too large", async () => {
    const file = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.png", { type: "image/png" });

    await expect(saveImage(file, 1, "profiles")).resolves.toEqual({
      error: "image_too_large",
      message: "El tamaño de la imagen no puede exceder los 5 MB."
    });
  });

  it("Saves the file and returns the public URL", async () => {
    const file = new File(["avatar"], "avatar", { type: "image/png" });
    Object.defineProperty(file, "arrayBuffer", {
      value: jest.fn().mockResolvedValue(new TextEncoder().encode("avatar").buffer)
    });
    const uploadDir = join(tempRoot, "public", "uploads", "profiles");
    mkdirSync(uploadDir, { recursive: true });

    const result = await saveImage(file, 1, "profiles");

    expect(result).toMatch(/^\/uploads\/profiles\/1-\d+\.jpg$/);
    const savedFile = (result as string).split("/").at(-1) ?? "";
    const savedPath = join(uploadDir, savedFile);

    expect(readFileSync(savedPath)).toEqual(Buffer.from("avatar"));
  });
});
