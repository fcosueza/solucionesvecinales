import { redirect } from "next/navigation";

/**
 * Backoffice index page.
 * Automatically redirects to the backoffice overview page.
 * This is the main access path to the administration panel.
 *
 * @component
 * @returns No returns content, only redirects
 */
export default function BackOfficeIndexPage() {
  redirect("/backoffice/overview");
}
