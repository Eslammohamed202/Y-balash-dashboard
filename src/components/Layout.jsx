import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#124734] ">
      <Sidebar />
      <div className="flex-1 bg-[#f2f4f7] p-4 rounded-3xl ">

        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
