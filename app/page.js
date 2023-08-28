import Timer from "@/components/Timer";
// import DesktopNotification from "@/components/timerComps/DesktopNotification";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Page() {
  
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen w-screen">
        <Timer />
        {/* <DesktopNotification /> */}
        <Footer />
      </div>
    </>
  );
}