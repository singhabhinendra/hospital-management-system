'use client'

import { useEffect } from 'react'

export default function GlobalStyles() {
  useEffect(() => {
    // Apply global styles to ensure all form elements are visible
    const addGlobalStyles = () => {
      const style = document.createElement('style')
      style.id = 'global-input-visibility'
      
      style.textContent = `
        /* Force all form elements to be visible */
        input, textarea, select {
          color: #111827 !important;
          background-color: #ffffff !important;
          opacity: 1 !important;
          -webkit-text-fill-color: #111827 !important;
        }
        
        input::placeholder, textarea::placeholder {
          color: #6b7280 !important;
          opacity: 0.7 !important;
          -webkit-text-fill-color: #6b7280 !important;
        }
        
        input:focus, textarea:focus, select:focus {
          color: #111827 !important;
          background-color: #ffffff !important;
          -webkit-text-fill-color: #111827 !important;
        }
        
        /* Ensure autofill doesn't break visibility */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #111827 !important;
        }
        
        /* Caret visibility */
        input, textarea {
          caret-color: #111827 !important;
        }
        
        /* Selection visibility */
        input::selection, textarea::selection {
          background-color: #3b82f6 !important;
          color: #ffffff !important;
        }
        
        /* Dark mode overrides */
        @media (prefers-color-scheme: dark) {
          input, textarea, select {
            color: #111827 !important;
            background-color: #ffffff !important;
            -webkit-text-fill-color: #111827 !important;
          }
          
          input::placeholder, textarea::placeholder {
            color: #6b7280 !important;
            -webkit-text-fill-color: #6b7280 !important;
          }
        }
      `
      
      // Remove existing style if it exists
      const existingStyle = document.getElementById('global-input-visibility')
      if (existingStyle) {
        existingStyle.remove()
      }
      
      document.head.appendChild(style)
    }

    // Apply styles immediately and after DOM changes
    addGlobalStyles()
    
    // Re-apply styles when new elements are added to the DOM
    const observer = new MutationObserver(() => {
      addGlobalStyles()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      observer.disconnect()
      const style = document.getElementById('global-input-visibility')
      if (style) {
        style.remove()
      }
    }
  }, [])

  return null
}
