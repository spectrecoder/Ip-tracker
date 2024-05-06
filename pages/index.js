import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// Components
import toast, { Toaster } from "react-hot-toast";
import DetailInfoCard from "../components/DetailInfoCard";
import Form from "../components/Form";

export default function Home({ data }) {
  const Map = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  const [detail, setDetail] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
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
      <nav className="flex fixed w-full top-0 md:px-24 px-4 z-10 backdrop-blur-3xl  border-green-100 py-2 items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.gif"
            alt="logo"
            className="object-cover w-14 h-14"
            width={500}
            height={500}
          />
        </Link>
        {/* <h1 style={{
            fontSize: '60px',
            fontStyle: 'italic',
            fontWeight: '900',
            color: 'deeppink',
            fontFamily: 'none'
          }}>WELCOME TO COM IP TRACKER!</h1> */}
      </nav>
      <main className="h-screen relative">
        <>
        <div className="h-[300px] bg-pattern bg-gray-900 bg-no-repeat bg-cover md:h-[180px] md:bg-left" />
        <div className="flex flex-col items-center w-full absolute top-0 z-[999]">
          <h1 className="text-white text-[1.625rem] font-medium leading-none mt-6 md:text-[2rem] md:mt-8" style={{ marginLeft: "-200px"}}>
            Com IP Address Tracker
          </h1>
          <div className="mt-7 md:mt-8 flex">
            <Form />
            <button
              className="mx-10 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setDetail(!detail)}>{detail == true ? "Main Info" : "Detail Info"}
            </button>
          </div>
          
          <div className="mt-6 md:mt-12">
            { !detail && (
                <></>
            )}
            { detail && (
                <DetailInfoCard
                ip={info.ip}
                location={`${info.city}, ${info.region}`}
                timezone={info.timezone}
                isp={info.isp}
              />
            )}
          </div>
        </div>
        <Map position={[info.lat, info.lng]} />
        </>
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
    console.log("---------this is data----------", data)
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
