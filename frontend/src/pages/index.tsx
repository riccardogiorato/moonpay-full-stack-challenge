import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CurrencyCard } from "../components/CurrencyCard";
import { Toggle } from "../components/Toggle";

export type MoonpayCurrency = {
  id: string;
  code: string;
  name: string;
  supportsTestMode: boolean;
  isSupportedInUS: boolean;
};

const Home: NextPage<{ initialCurrencies: MoonpayCurrency[] }> = ({
  initialCurrencies,
}) => {
  const [currencies, setCurrencies] =
    useState<MoonpayCurrency[]>(initialCurrencies);

  const [toggleSupportedInUs, setToggleSupportedInUs] = useState(false);
  const [toggleSupportsTestMode, setToggleSupportsTestMode] = useState(false);

  useEffect(() => {
    const filteredCurrencies = initialCurrencies.filter((currency) => {
      const filterUs = toggleSupportedInUs && !currency.isSupportedInUS;
      const filterTestMode =
        toggleSupportsTestMode && !currency.supportsTestMode;
      if (filterUs || filterTestMode) return false;
      return true;
    });
    if (
      filteredCurrencies !== currencies &&
      filteredCurrencies.length !== currencies.length
    ) {
      setCurrencies(filteredCurrencies);
    }
  }, [toggleSupportedInUs, toggleSupportsTestMode]);

  const SortAlphabetical = (sortKey: "name" | "code") => {
    const sortedCurrencies = currencies.sort((a, b) => {
      // console.log(sortKey, a[sortKey], b[sortKey]);
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
    setCurrencies([...sortedCurrencies]);
  };

  const Shuffle = () => {
    const shuffledCurrencies = [...currencies].sort(() => 0.5 - Math.random());
    setCurrencies(shuffledCurrencies);
  };

  return (
    <main className="main">
      <h1 className="title">Full Stack Challenge Moonpay</h1>

      <div className="controls">
        <Toggle
          label={
            <div style={{ display: "flex" }}>
              Supported in USA &nbsp; <img src="/us.svg" alt="" />
            </div>
          }
          active={toggleSupportedInUs}
          onChange={setToggleSupportedInUs}
        />
        <Toggle
          label="Supports test mode"
          active={toggleSupportsTestMode}
          onChange={setToggleSupportsTestMode}
        />

        <Button onClick={() => SortAlphabetical("name")}>
          Sort Alphabetical Name Currency
        </Button>

        <Button onClick={() => SortAlphabetical("code")}>
          Sort Alphabetical Symbol Code Currency
        </Button>

        <Button onClick={Shuffle}>Shuffle Currency</Button>
      </div>

      <div className="grid">
        {currencies.map((currency) => (
          <CurrencyCard key={currency.id} currency={currency} />
        ))}
      </div>

      <p className="description">
        <a
          href="https://github.com/riccardogiorato"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Riccardo Giorato
        </a>
      </p>
    </main>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetcher("https://api.moonpay.com/v3/currencies");
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialCurrencies: data,
    },
  };
};

export default Home;
