import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="min-h-screen h-auto bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 overflow-y-scroll scrollbar-hide">
      <Head>
        <title>RemitMate</title>
        <meta name="description" content="RemitMate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Feed />

      {/* Modal */}
      <Modal />
    </div>
  );
}
