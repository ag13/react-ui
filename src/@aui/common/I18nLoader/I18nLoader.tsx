import React from 'react'
import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

export const i18n = setupI18n()

interface I18nProps{
    language: string
}

export const I18nLoader: React.FC<I18nProps> = ({language, children}) => {
    return (
        <I18nProvider language={language} i18n={i18n}>
            {children}
        </I18nProvider>
    )
}