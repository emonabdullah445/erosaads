"use client";
import React from "react";
import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import Security from "./Security";
import useMockLogin from "../hooks/useMockLogin";
function Home({ adminId, posterId }) {
  const [showModal, setShowModal] = useState(false);

  const { login } = useMockLogin(adminId, posterId, setShowModal);

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

export default Home;