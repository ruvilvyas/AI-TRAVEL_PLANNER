import "../app/globals.css"; // Ensure the correct path to globals.css
import DashboardLayout from "@/components/DashboardLayout"; // Use alias for better imports

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900"> {/* Tailwind styles applied */}
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
