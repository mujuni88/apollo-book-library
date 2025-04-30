import React from "react";
import { HeroUIProvider } from '@heroui/react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { AppRouter } from "./AppRouter";
import './index.css';
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "sonner";
import { client } from "./lib/client";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <ApolloProvider client={client}>
          <Toaster richColors position="top-right" />
          <div className="w-screen h-screen">
            <AppRouter />
          </div>
        </ApolloProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)