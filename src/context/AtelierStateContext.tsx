import React, { createContext, useContext, useState } from 'react';

interface AtelierInquiryDraft {
  serviceIndex: number;
  prefilledStory: string;
  brandName?: string;
}

interface AtelierStateContextValue {
  draft: AtelierInquiryDraft;
  applyDiagnosisToInquiry: (draft: AtelierInquiryDraft) => void;
  selectServiceForInquiry: (serviceIndex: number) => void;
}

const AtelierStateContext = createContext<AtelierStateContextValue | undefined>(undefined);

export const AtelierStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<AtelierInquiryDraft>({
    serviceIndex: 0,
    prefilledStory: '',
    brandName: '',
  });

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const applyDiagnosisToInquiry = (next: AtelierInquiryDraft) => {
    setDraft(next);
    scrollToContact();
  };

  const selectServiceForInquiry = (serviceIndex: number) => {
    setDraft((prev) => ({ ...prev, serviceIndex }));
    scrollToContact();
  };

  return (
    <AtelierStateContext.Provider
      value={{ draft, applyDiagnosisToInquiry, selectServiceForInquiry }}
    >
      {children}
    </AtelierStateContext.Provider>
  );
};

export const useAtelierState = (): AtelierStateContextValue => {
  const ctx = useContext(AtelierStateContext);
  if (!ctx) throw new Error('useAtelierState must be used within AtelierStateProvider');
  return ctx;
};
