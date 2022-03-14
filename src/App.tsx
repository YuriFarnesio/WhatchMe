import { GlobalProvider } from './context/GlobalContext';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <GlobalProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </GlobalProvider>
  )
}