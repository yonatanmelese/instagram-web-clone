import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="instagram clone with nextjs" />
        <link rel="icon" href="/Instagram_logo.png" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </>
  );
}
