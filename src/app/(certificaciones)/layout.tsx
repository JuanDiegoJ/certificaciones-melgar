import { auth } from "@/auth.config";
import { Header, HeaderMobile, MarginWidthWrapper, PageWrapper, Sidebar } from "@/components";
import { redirect } from "next/navigation";

export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/auth/login')
  }
  return (
    <div className="flex">
        <Sidebar />
        <main className="flex-1">
        <MarginWidthWrapper>
            <Header />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
        </main>
    </div>
  );
}