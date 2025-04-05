import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getAdmin } from "@/actions/admin";
import { Sidebar } from "./admin/components/sidebar";


export default async function AdminLayout({children}){
    const admin = await getAdmin();

    if(!admin.authroized){
        return notFound();
    }

    return(
        <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
    )
}