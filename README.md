# NeuroSphere Pitch Presentation

Zaawansowany szablon prezentacji w Next.js z 10 sekcjami przygotowanymi pod animacje i komponenty background.

## Funkcjonalności

- ✨ 10 sekcji z unikalną strukturą
- 🎨 Przezroczysty navbar z scroll navigation
- 🎭 Framer Motion animacje
- 📱 Responsywny design
- 🎯 Smooth scroll między sekcjami
- 🎪 System dla różnych backgroundów każdej sekcji
- 🌈 Tailwind CSS z custom animacjami

## Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie development
npm run dev

# Build produkcyjny
npm run build

# Uruchomienie produkcyjnego builda
npm start
```

## Struktura sekcji

Każda sekcja ma:
- Unikalny ID (`section1`, `section2`, etc.)
- Możliwość dodania custom background component
- Konfigurowalny kolor tła i tekstu
- Wbudowane animacje Framer Motion
- Responsywny layout

## Dodawanie komponentów background

Każda sekcja przyjmuje prop `backgroundComponent`:

```tsx
<Section
  id="section1"
  title="Tytuł"
  subtitle="Podtytuł"
  backgroundComponent={<TwójKomponentBackground />}
  backgroundColor="bg-custom-color"
  textColor="text-custom-color"
>
  {/* Opcjonalna treść */}
</Section>
```

## Navbar

Navbar automatycznie:
- Śledzi aktywną sekcję podczas scroll'a
- Zapewnia smooth scroll do każdej sekcji
- Chowa się przy scroll'u w dół, pokazuje przy scroll'u w górę
- Zawiera progress bar na dole

Gotowe do implementacji Twoich komponentów!
