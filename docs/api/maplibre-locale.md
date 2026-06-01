# MapLibreLocale

Updates symbol layer labels from browser language preference (`navigator.language`) with a fallback strategy.

## Props

No props.

## Emits

No custom emit.

## Behavior

- Watches map availability and current locale.
- Rewrites symbol `text-field` to a `coalesce` expression:
  - `name_<full-locale>` (example: `name_fr-FR`)
  - `name_<language>` (example: `name_fr`)
  - `name_en`
  - `name`
- Reacts to browser `languagechange`.

## Example

`MapLibreLocale` is auto-rendered by `MapLibre` when plugin or component `i18n` is enabled.
