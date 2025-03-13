
import { createRoot } from 'react-dom/client'
import {MantineProvider} from "@mantine/core"
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import "@mantine/core/styles.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <MantineProvider>
    <App />
  </MantineProvider>
</BrowserRouter>
)
