import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

// Components
import toast, { Toaster } from "react-hot-toast";
import Form from "../components/Form";
import InfoCard from "../components/InfoCard";

export default function Home({ data }) {
  const Map = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  const [info, setInfo] = useState({
    ip: "n/a",
    city: "n/a",
    region: "n/a",
    timezone: "n/a",
    isp: "n/a",
    lat: -6.175010662604421,
    lng: 106.82700139258762,
  });

  useEffect(() => {
    if (data) {
      setInfo({
        ip: data.ip ?? "n/a",
        city: data.location?.city ?? "n/a",
        region: data.location?.region ?? "n/a",
        timezone: data.location?.timezone ?? "n/a",
        isp: data.isp ?? "n/a",
        lat: data.location?.lat ?? -6.175010662604421,
        lng: data.location?.lng ?? 106.82700139258762,
      })

      if (data.messages) {
        toast.error(data.messages, {
          position: 'top-right'
        });
      }
    } else {
      toast.error("Internal Server Error", {
        position: 'top-right'
      });
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Commune IP Address Tracker</title>
        <meta name="description" content="COM IP Address Tracker" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <main className="h-screen relative">
        <div className="h-[300px] bg-pattern bg-center-56 bg-no-repeat bg-cover md:h-[280px] md:bg-left" />
        <div className="flex flex-col items-center w-full absolute top-0 z-[999]">
          <h1 className="text-white text-[1.625rem] font-medium leading-none mt-6 md:text-[2rem] md:mt-8">
            Com IP Address Tracker
          </h1>
          <div className="mt-7 md:mt-8">
            <Form />
          </div>
          <div className="mt-6 md:mt-12">
            <InfoCard
              ip={info.ip}
              location={`${info.city}, ${info.region}`}
              timezone={info.timezone}
              isp={info.isp}
            />
          </div>
        </div>
        <Map position={[info.lat, info.lng]} />
      </main>
      <Toaster />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const queryIpAddress = query.value ?? null;

  if (!queryIpAddress) {
    const resGetIpAddress = await fetch('https://api.ipify.org/?format=json');
    const data = await resGetIpAddress.json()

    if (!data) {
      return {
        redirect: {
          destination: '/?value=0.0.0.0',
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/?value=${data.ip}`,
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${queryIpAddress}&domain=${queryIpAddress}`
  );
  const data = await res.json();

  if (!data) {
    return {
      props: {
        data: null,
      },
    };
  }

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
