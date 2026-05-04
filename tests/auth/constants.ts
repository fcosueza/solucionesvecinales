import path from "path";

export const AUTH_DIR = path.join(__dirname, "../.auth");
export const INQUILINO_FILE = path.join(AUTH_DIR, "inquilino.json");
export const ADMIN_FILE = path.join(AUTH_DIR, "admin.json");

export const INQUILINO_CREDENTIALS = {
  email: "alvaro.santos@vecinos.local",
  password: "VecinosSeguro2026!",
  role: "inquilino"
};

export const ADMIN_CREDENTIALS = {
  email: "webadmin@vecinos.local",
  password: "VecinosSeguro2026!",
  role: "adminWeb"
};
