/* Tailwind design tokens — must load right after the Tailwind CDN. */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: { 50: '#eef2ff', 100: '#e0e7ff', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
                math: '#7c3aed',
                english: '#0284c7',
                evs: '#059669',
                sunshine: '#fbbf24',
                bubblegum: '#f472b6'
            },
            fontFamily: {
                sans: ['Fredoka', 'Baloo 2', 'Comic Sans MS', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                blob: '1.75rem'
            }
        }
    }
}
