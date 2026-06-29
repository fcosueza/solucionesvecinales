import path from "path";

export const AUTH_DIR = path.join(__dirname, "../.auth");
export const TENANT_FILE = path.join(AUTH_DIR, "tenant.json");
export const ADMIN_FILE = path.join(AUTH_DIR, "admin.json");

export const TENANT_CREDENTIALS = {
  email: "alvaro.santos@vecinos.local",
  password: "VecinosSeguro2026!",
  role: "tenant"
};

export const ADMIN_CREDENTIALS = {
  email: "webadmin@vecinos.local",
  password: "VecinosSeguro2026!",
  role: "adminWeb"
};
