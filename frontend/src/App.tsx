import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingBtn } from './components/WhatsAppFloatingBtn';
import { CataloguePage } from './pages/CataloguePage';
import { AProposPage } from './pages/AProposPage';
import { ContactPage } from './pages/ContactPage';
import { DevisPage } from './pages/DevisPage';
import type { ProductItem } from './data/catalogData';

type TabId = 'catalogue' | 'a-propos' | 'contact' | 'devis';

const VALID_TABS: TabId[] = ['catalogue', 'a-propos', 'contact', 'devis'];

// Helper to determine the initial tab from URL pathname, hash, or sessionStorage
const getInitialTab = (): TabId => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

  const candidate = path || hash;
  if (candidate === 'a-propos' || candidate === 'apropos') return 'a-propos';
  if (candidate === 'contact') return 'contact';
  if (candidate === 'devis') return 'devis';
  if (candidate === 'catalogue') return 'catalogue';

  // Fallback to sessionStorage
  const saved = sessionStorage.getItem('cosmelys_current_tab');
  if (saved && VALID_TABS.includes(saved as TabId)) {
    return saved as TabId;
  }

  return 'catalogue';
};

// Helper to determine initial selected gamme
const getInitialGammeId = (): string => {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('gamme');
  if (fromUrl) return fromUrl;

  const saved = sessionStorage.getItem('cosmelys_selected_gamme');
  if (saved) return saved;

  return 'all';
};

function App() {
  const [currentTab, setCurrentTabState] = useState<TabId>(getInitialTab);
  const [selectedGammeId, setSelectedGammeId] = useState<string>(getInitialGammeId);
  const [preSelectedProduct, setPreSelectedProduct] = useState<ProductItem | null>(null);

  // Function to navigate between tabs
  const navigateToTab = (tab: TabId, updateHistory = true) => {
    setCurrentTabState(tab);
    sessionStorage.setItem('cosmelys_current_tab', tab);

    if (updateHistory) {
      let targetPath = tab === 'catalogue' ? '/' : `/${tab}`;
      if (tab === 'catalogue' && selectedGammeId !== 'all') {
        targetPath = `/?gamme=${selectedGammeId}`;
      }
      if (window.location.pathname + window.location.search !== targetPath) {
        window.history.pushState({ tab, gamme: selectedGammeId }, '', targetPath);
      }
    }
  };

  // Synchronize URL on initial load and handle browser back/forward buttons
  useEffect(() => {
    const initialTab = getInitialTab();
    const initialGamme = getInitialGammeId();
    sessionStorage.setItem('cosmelys_current_tab', initialTab);
    sessionStorage.setItem('cosmelys_selected_gamme', initialGamme);

    // Sync URL if needed
    let expectedUrl = initialTab === 'catalogue' ? '/' : `/${initialTab}`;
    if (initialTab === 'catalogue' && initialGamme !== 'all') {
      expectedUrl = `/?gamme=${initialGamme}`;
    }

    if (window.location.pathname + window.location.search !== expectedUrl && !window.location.hash) {
      window.history.replaceState({ tab: initialTab, gamme: initialGamme }, '', expectedUrl);
    }

    const handlePopState = () => {
      const tabFromUrl = getInitialTab();
      const gammeFromUrl = getInitialGammeId();
      setCurrentTabState(tabFromUrl);
      setSelectedGammeId(gammeFromUrl);
      sessionStorage.setItem('cosmelys_current_tab', tabFromUrl);
      sessionStorage.setItem('cosmelys_selected_gamme', gammeFromUrl);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectGamme = (gammeId: string) => {
    setSelectedGammeId(gammeId);
    sessionStorage.setItem('cosmelys_selected_gamme', gammeId);
    setCurrentTabState('catalogue');
    sessionStorage.setItem('cosmelys_current_tab', 'catalogue');

    const targetUrl = gammeId === 'all' ? '/' : `/?gamme=${gammeId}`;
    if (window.location.pathname + window.location.search !== targetUrl) {
      window.history.pushState({ tab: 'catalogue', gamme: gammeId }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForDevis = (product: ProductItem) => {
    setPreSelectedProduct(product);
    navigateToTab('devis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDevis = () => {
    navigateToTab('devis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCatalogue = () => {
    handleSelectGamme('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F4]">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          navigateToTab(tab as TabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedGammeId={selectedGammeId}
        onSelectGamme={handleSelectGamme}
      />

      <main className="flex-1">
        {currentTab === 'catalogue' && (
          <CataloguePage
            selectedGammeId={selectedGammeId}
            onSelectGamme={handleSelectGamme}
            onSelectForDevis={handleSelectForDevis}
            onGoToDevis={handleGoToDevis}
          />
        )}

        {currentTab === 'a-propos' && (
          <AProposPage
            onGoToDevis={handleGoToDevis}
            onGoToCatalogue={handleGoToCatalogue}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'devis' && (
          <DevisPage
            preSelectedProduct={preSelectedProduct}
            onClearPreselected={() => setPreSelectedProduct(null)}
          />
        )}
      </main>

      <Footer
        setCurrentTab={(tab) => {
          navigateToTab(tab as TabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <WhatsAppFloatingBtn />
    </div>
  );
}

export default App;
