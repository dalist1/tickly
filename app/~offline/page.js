import Clock from "@/components/Clock";
import Timer from "@/components/Timer";
import DesktopNotification from "@/components/DesktopNotification";
import Footer from "@/components/Footer";

export default async function Page() {

  return (
    <div className="flex justify-center items-center h-screen w-screen relative">
      <Clock />
      <Timer />
      <DesktopNotification />
      <Footer />
    </div>
  );
}