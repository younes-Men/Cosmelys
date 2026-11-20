import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingBtn } from './components/WhatsAppFloatingBtn';
import { CataloguePage } from './pages/CataloguePage';
import { AProposPage } from './pages/AProposPage';
import { ContactPage } from './pages/ContactPage';
import { DevisPage } from './pages/DevisPage';
import type { ProductItem } from './data/catalogData';

type TabId = 'catalogue' | 'a-propos' | 'contact' | 'devis';

function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('catalogue');
  const [selectedGammeId, setSelectedGammeId] = useState<string>('all');
  const [preSelectedProduct, setPreSelectedProduct] = useState<ProductItem | null>(null);

  const handleSelectGamme = (gammeId: string) => {
    setSelectedGammeId(gammeId);
    setCurrentTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForDevis = (product: ProductItem) => {
    setPreSelectedProduct(product);
    setCurrentTab('devis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDevis = () => {
    setCurrentTab('devis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCatalogue = () => {
    setCurrentTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F4]">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => setCurrentTab(tab as TabId)}
        selectedGammeId={selectedGammeId}
        onSelectGamme={handleSelectGamme}
      />

      <main className="flex-1">
        {currentTab === 'catalogue' && (
          <CataloguePage
            selectedGammeId={selectedGammeId}
            onSelectGamme={setSelectedGammeId}
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

      <Footer setCurrentTab={(tab) => setCurrentTab(tab as TabId)} />
      <WhatsAppFloatingBtn />
    </div>
  );
}

export default App;
