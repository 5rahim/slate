export const createVaultSession = async (url?: string) => {
   const response = await fetch('/api/apideck/vault/sessions', {
      method: 'POST',
      body: JSON.stringify({
         // redirect_uri: url || window.location.href,
         settings: {
            sandbox_mode: false,
            isolation_mode: true,
            show_suggestions: false,
            unified_apis: ['file-storage']
         },
         "theme": {
            "favicon": "https://res.cloudinary.com/apideck/icons/intercom",
            "primary_color": "#286efa",
            "privacy_url": "https://compliance.apideck.com/privacy-policy",
            "sidepanel_background_color": "#286efa",
            "sidepanel_text_color": "#FFFFFF",
            "vault_name": "Slate"
         }
      })
   })
   return response.json()
}
