import { GetServerSideProps } from "next";

import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
  priceId: string;
  amount: number;
}
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            {" "}
            News about the <span>React</span>Wordl
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const  getServerSideProps: GetServerSideProps = async () => {
const price = await stripe.prices.retrieve('price_1Kmk8jAK85FCE6K35Ft4DVEX')
const product = {
  priceId: price.id,
  amount: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  }). format(price.unit_amount / 100), //sempre salvar em centavo, para não lidar com numeros complexos
};

  return { 
    props: {
      product,
  }
  }
}