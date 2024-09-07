import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import { router } from './website/routes/router';
import ContextProvider from './website/context/ContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //     <ContextProvider>
  //       <RouterProvider router={router} />
  //     </ContextProvider>
  //   </QueryClientProvider>
  // </React.StrictMode>,


  <React.StrictMode>

    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </QueryClientProvider>
    </ThemeProvider>

  </React.StrictMode>
);
