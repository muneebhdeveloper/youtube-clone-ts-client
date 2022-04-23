import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationsProvider } from "@mantine/notifications";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Functional Youtube Clone</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <NotificationsProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </NotificationsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
